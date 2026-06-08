import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

async function expectAccessible(page: Page) {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  expect(accessibilityScanResults.violations).toEqual([])
}

function createMockJwt() {
  const header = windowSafeBase64({ alg: 'HS256', typ: 'JWT' })
  const payload = windowSafeBase64({
    aud: 'authenticated',
    exp: Math.floor(Date.now() / 1000) + 3600,
    sub: '00000000-0000-4000-8000-000000000001',
    email: 'guardian@example.com',
    role: 'authenticated',
  })

  return `${header}.${payload}.mock-signature`
}

function windowSafeBase64(value: Record<string, unknown>) {
  return Buffer.from(JSON.stringify(value))
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '')
}

test('signin renders email, password, and auth links', async ({ page }) => {
  await page.goto('/signin')

  await expect(
    page.getByRole('heading', { name: 'Sign in', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible()
  await expect(
    page.getByRole('textbox', { name: 'Password', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Continue with Google' }),
  ).toHaveCount(0)
  await expect(
    page.getByRole('link', { name: 'Forgot password?' }),
  ).toHaveAttribute('href', '/forgot-password')
  await expect(
    page.getByRole('link', { name: 'Create an account' }),
  ).toHaveAttribute('href', '/signup')

  await expectAccessible(page)
})

test('navbar reflects a signed-in session after signin', async ({ page }) => {
  await page.route('**/rest/v1/profiles*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        role: 'guardian',
      }),
    })
  })

  await page.route('**/auth/v1/token*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: createMockJwt(),
        token_type: 'bearer',
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        refresh_token: 'mock-refresh-token',
        user: {
          id: '00000000-0000-4000-8000-000000000001',
          aud: 'authenticated',
          role: 'authenticated',
          email: 'guardian@example.com',
          email_confirmed_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          app_metadata: {},
          user_metadata: {},
        },
      }),
    })
  })

  await page.goto('/signin')
  const submitButton = page.getByRole('button', { name: 'Sign in' })
  await expect(submitButton).toBeEnabled()
  await page
    .getByRole('textbox', { name: 'Email' })
    .fill('guardian@example.com')
  await page
    .getByRole('textbox', { name: 'Password', exact: true })
    .fill('password123')
  await submitButton.click()

  await expect(page).toHaveURL('/dashboard/guardian')
  await expect(
    page.getByRole('heading', { name: 'Guardian dashboard' }),
  ).toBeVisible()
  await expect(page.getByText('Guardian - guardian@example.com')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Sign In' })).toHaveCount(0)
})

test('signin shows invalid credentials as a red alert', async ({ page }) => {
  await page.route('**/auth/v1/token*', async (route) => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        error: 'invalid_grant',
        error_description: 'Invalid login credentials',
        msg: 'Invalid login credentials',
      }),
    })
  })

  await page.goto('/signin')
  const submitButton = page.getByRole('button', { name: 'Sign in' })
  await expect(submitButton).toBeEnabled()
  await page.getByRole('textbox', { name: 'Email' }).fill('wrong@example.com')
  await page
    .getByRole('textbox', { name: 'Password', exact: true })
    .fill('wrong-password')
  await submitButton.click()

  const alert = page.getByRole('alert')
  await expect(alert).toHaveText('Invalid login credentials')
  await expect(alert).toHaveAttribute('data-tone', 'destructive')
})

test('signup renders Guardian form and blocks invalid input', async ({
  page,
}) => {
  await page.goto('/signup')

  await expect(
    page.getByRole('heading', { name: 'Create account' }),
  ).toBeVisible()
  await expect(
    page.getByText('We will send a confirmation link.'),
  ).toBeVisible()
  await expect(
    page.getByRole('textbox', { name: 'Parent or guardian name' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Sign up with Google' }),
  ).toHaveCount(0)

  const submitButton = page.getByRole('button', {
    name: 'Create account',
  })
  await expect(submitButton).toBeEnabled()
  await submitButton.click()

  await expect(
    page.getByText('Enter the guardian or parent name.'),
  ).toBeVisible()
  await expect(page.getByText('Enter your email address.')).toBeVisible()
  await expect(
    page.getByText('Password must be at least 8 characters.'),
  ).toBeVisible()

  await expectAccessible(page)
})

test('forgot password renders reset form and confirmation UI', async ({
  page,
}) => {
  await page.route('**/auth/v1/recover*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '{}',
    })
  })

  await page.goto('/forgot-password')

  await expect(
    page.getByRole('heading', { name: 'Reset password' }),
  ).toBeVisible()
  const submitButton = page.getByRole('button', {
    name: 'Send reset instructions',
  })
  await expect(submitButton).toBeEnabled()
  await page
    .getByRole('textbox', { name: 'Email' })
    .fill('guardian@example.com')
  await submitButton.click()

  await expect(
    page.getByText('Reset instructions were sent to guardian@example.com.'),
  ).toBeVisible()

  await expectAccessible(page)
})

test('reset password renders new password form and blocks invalid input', async ({
  page,
}) => {
  await page.goto('/reset-password')

  await expect(
    page.getByRole('heading', { name: 'Set new password' }),
  ).toBeVisible()
  const submitButton = page.getByRole('button', { name: 'Update password' })
  await expect(submitButton).toBeEnabled()
  await submitButton.click()

  await expect(
    page.getByText('Password must be at least 8 characters.'),
  ).toBeVisible()
  await expect(page.getByText('Confirm your password.')).toBeVisible()

  await expectAccessible(page)
})
