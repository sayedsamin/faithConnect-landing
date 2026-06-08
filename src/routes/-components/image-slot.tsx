import { useMemo, useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'

type ImageSlotProps = {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  label?: string
  loading?: 'eager' | 'lazy'
  imagePosition?: 'center' | 'top' | string
}

export function ImageSlot({
  src,
  alt,
  className,
  width = 1200,
  height = 800,
  label = 'Add image',
  loading = 'lazy',
  imagePosition = 'center',
}: ImageSlotProps) {
  const [hasError, setHasError] = useState(false)
  const [candidateIndex, setCandidateIndex] = useState(0)

  const candidates = useMemo(() => {
    const match = src.match(/^(.*)\.([a-zA-Z0-9]+)$/)
    if (!match) return [src]

    const [, base, extRaw] = match
    const ext = extRaw.toLowerCase()
    if (ext === 'svg') return [src]

    const ordered =
      ext === 'jpg' || ext === 'jpeg' || ext === 'png'
        ? [`${base}.avif`, `${base}.webp`, src]
        : ext === 'avif' || ext === 'webp'
          ? [src, `${base}.jpg`, `${base}.jpeg`, `${base}.png`]
          : [src, `${base}.avif`, `${base}.webp`]
    return [...new Set(ordered)]
  }, [src])

  const resolvedSrc = candidates[candidateIndex] ?? src

  const handleImageError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1)
      return
    }
    setHasError(true)
  }

  const resolvedObjectPosition =
    imagePosition === 'top'
      ? 'top center'
      : imagePosition === 'center'
        ? 'center'
        : imagePosition

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${className ?? ''}`}
      style={{
        borderColor: 'var(--line)',
        background:
          'linear-gradient(145deg, color-mix(in oklab, var(--surface-strong) 88%, transparent), color-mix(in oklab, var(--surface) 92%, transparent))',
      }}
    >
      {!hasError ? (
        <img
          src={resolvedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          className="h-full w-full object-cover"
          style={{ objectPosition: resolvedObjectPosition }}
          onError={handleImageError}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 text-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageIcon className="h-7 w-7" aria-hidden />
            <span className="text-sm font-semibold">{label}</span>
          </div>
        </div>
      )}
    </div>
  )
}
