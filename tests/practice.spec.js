// fpl-login.spec.js
const { test, expect } = require('@playwright/test');

test('Login to Fantasy Premier League', async ({ page }) => {
  // Navigate to FPL home
  await page.goto('https://fantasy.premierleague.com/');

  // Click the "Log In" button on top right (opens modal)
  await page.click('text=Log In');

  // Fill in login form (inside modal)
  await page.fill('input[name="loginUsername"]', 'abijitdulal74@gmail.com');
  await page.fill('input[name="loginPassword"]', 'Dulal@9864');

  // Click Login
  await page.click('button[type="submit"]');
  // Verify user is logged in (profile icon appears)
  const profileIcon = await page.locator('[data-testid="user-menu-button"]');
  await expect(profileIcon).toBeVisible();
});
