import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('homepage renders hero heading', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: 'Inspiring Young Minds to' }),
  ).toBeVisible()

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
  expect(accessibilityScanResults.violations).toEqual([])
})
