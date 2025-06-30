import { test, expect } from '@playwright/test';

test('Valid login test', async ({ page }) => {
  await page.goto('https://www.facebook.com');

  await page.fill('#username', '9864542484');
  await page.fill('#password', '@bijit9864');
  await page.click('button[type="submit"]');

  await expect(page.locator('.success-message')).toHaveText('Welcome back!');
});


test('Invalid login test', async ({ page }) => {
  await page.goto('https://example.com/login');

  await page.fill('#username', '9864542484');
  await page.fill('#password', 'wrongPassword');
  await page.click('button[type="submit"]');

  await expect(page.locator('.error-message')).toHaveText('Invalid credentials');
});


