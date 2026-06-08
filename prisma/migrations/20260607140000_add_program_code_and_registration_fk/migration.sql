-- Add a stable program code to Programs for relation identity.
ALTER TABLE public.programs
  ADD COLUMN IF NOT EXISTS code text;

-- Ensure the known canonical summer program keeps the expected business code.
UPDATE public.programs
SET code = 'summer2026'
WHERE id = '51ec736f-1b48-46c3-9d25-eab25c035b3c';

-- Backfill all existing programs to ensure Program.code is present for FK consistency.
UPDATE public.programs
SET code = CASE
  WHEN trim(coalesce(code, '')) <> '' THEN code
  WHEN trim(coalesce(name, '')) <> '' THEN
    'program-' || substr(md5(name || '-' || id::text), 1, 16)
  ELSE
    'program-' || substr(md5(id::text), 1, 24)
END
WHERE trim(coalesce(code, '')) = '';

WITH counted AS (
  SELECT
    id,
    code,
    ROW_NUMBER() OVER (
      PARTITION BY code
      ORDER BY (id = '51ec736f-1b48-46c3-9d25-eab25c035b3c') DESC, id
    ) AS sequence,
    COUNT(*) OVER (PARTITION BY code) AS total
  FROM public.programs
  WHERE trim(coalesce(code, '')) <> ''
),
duplicates AS (
  SELECT id, code, sequence
  FROM counted
  WHERE total > 1
)
UPDATE public.programs
SET code = duplicates.code || '-' || duplicates.sequence::text
FROM duplicates
WHERE public.programs.id = duplicates.id
  AND duplicates.sequence > 1;

-- Ensure uniqueness required by Prisma relation metadata.
CREATE UNIQUE INDEX IF NOT EXISTS programs_code_key
  ON public.programs (code);

-- Enforce code as required now that it is the registration relation key.
ALTER TABLE public.programs
  ALTER COLUMN code SET NOT NULL;

-- Add a FK from summer registrations to Program.code without validating legacy data immediately.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    WHERE c.conname = 'summer_program_registrations_program_code_fkey'
      AND t.relname = 'summer_program_registrations'
  ) THEN
    ALTER TABLE public.summer_program_registrations
      ADD CONSTRAINT summer_program_registrations_program_code_fkey
      FOREIGN KEY (program_code) REFERENCES public.programs(code) ON DELETE RESTRICT NOT VALID;
  END IF;
END $$;

-- Validate FK coverage now that references are migrated.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM public.summer_program_registrations s
    LEFT JOIN public.programs p ON p.code = s.program_code
    WHERE p.code IS NULL
  ) THEN
    ALTER TABLE public.summer_program_registrations
      VALIDATE CONSTRAINT summer_program_registrations_program_code_fkey;
  ELSE
    RAISE NOTICE 'summer_program_registrations.program_code contains values with no matching program.code. FK remains NOT VALID.';
  END IF;
END $$;
