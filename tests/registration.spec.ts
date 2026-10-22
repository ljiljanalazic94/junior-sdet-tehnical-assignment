
import { test, expect } from '@playwright/test';

test('User can register a new account successfully', async ({ page }) => {
  await page.goto('https://demo.prestashop.com/#/en/front');

  const store = page.frameLocator('iframe[name="framelive"]');

  await store.getByLabel('Sign in').click();
  await store.getByRole('link', { name: 'Create your account' }).click();

  const firstNameInput = store.getByRole('textbox', { name: 'First name' });
  const lastNameInput = store.getByRole('textbox', { name: 'Last name' });
  const emailInput = store.getByRole('textbox', {
    name: 'Email',
    exact: true,
  });
  const passwordInput = store.getByRole('textbox', { name: 'Password' });

  const email = `test.registration.${Date.now()}@example.com`;

  await firstNameInput.fill('Test');
  await lastNameInput.fill('User');
  await emailInput.fill(email);
  await passwordInput.fill('TestPassword123!');

  await expect(firstNameInput).toHaveValue('Test');
  await expect(lastNameInput).toHaveValue('User');
  await expect(emailInput).toHaveValue(email);
  await expect(passwordInput).toHaveValue('TestPassword123!');

  await store.getByRole('checkbox', {
    name: 'I agree to the terms and',
  }).check();

  await store.getByRole('checkbox', {
    name: 'Customer data privacy The',
  }).check();

  await store.getByRole('button', { name: 'Create account' }).click();

  const accountButton = store.getByRole('button', {
    name: 'View my account (Test User)',
  });

  await expect(accountButton).toBeVisible();
  await accountButton.click();

  await expect(
    store.getByText('Sign out', { exact: true }).first()
  ).toBeVisible();
});

test('Registration form prevents submission when required fields are empty', async ({ page }) => {
  await page.goto('https://demo.prestashop.com/#/en/front');

  const store = page.frameLocator('iframe[name="framelive"]');

  await store.getByLabel('Sign in').click();
  await store.getByRole('link', { name: 'Create your account' }).click();

  const firstNameInput = store.getByRole('textbox', {
    name: 'First name',
  });
  const lastNameInput = store.getByRole('textbox', {
    name: 'Last name',
  });
  const emailInput = store.getByRole('textbox', {
    name: 'Email',
    exact: true,
  });
  const passwordInput = store.getByRole('textbox', {
    name: 'Password',
  });

  await store.getByRole('button', { name: 'Create account' }).click();

  await expect(firstNameInput).toHaveJSProperty('validity.valid', false);
  await expect(lastNameInput).toHaveJSProperty('validity.valid', false);
  await expect(emailInput).toHaveJSProperty('validity.valid', false);
  await expect(passwordInput).toHaveJSProperty('validity.valid', false);
});

test('Registration form rejects an invalid email address', async ({ page }) => {
  await page.goto('https://demo.prestashop.com/#/en/front');

  const store = page.frameLocator('iframe[name="framelive"]');

  await store.getByLabel('Sign in').click();
  await store.getByRole('link', { name: 'Create your account' }).click();

  const firstNameInput = store.getByRole('textbox', {
    name: 'First name',
  });
  const lastNameInput = store.getByRole('textbox', {
    name: 'Last name',
  });
  const emailInput = store.getByRole('textbox', {
    name: 'Email',
    exact: true,
  });
  const passwordInput = store.getByRole('textbox', {
    name: 'Password',
  });

  await firstNameInput.fill('Test');
  await lastNameInput.fill('User');
  await emailInput.fill('invalid-email');
  await passwordInput.fill('TestPassword123!');

  await expect(emailInput).toHaveJSProperty('validity.valid', false);

  await store.getByRole('button', { name: 'Create account' }).click();

  await expect(emailInput).toHaveJSProperty('validity.valid', false);
});

test('Registration form rejects a password shorter than 8 characters', async ({ page }) => {
  await page.goto('https://demo.prestashop.com/#/en/front');

  const store = page.frameLocator('iframe[name="framelive"]');

  await store.getByLabel('Sign in').click();
  await store.getByRole('link', { name: 'Create your account' }).click();

  const firstNameInput = store.getByRole('textbox', {
    name: 'First name',
  });

  await expect(firstNameInput).toBeVisible();

  const passwordInput = store.getByRole('textbox', {
    name: 'Password',
  });

  await passwordInput.fill('abc');

  await expect(passwordInput).toHaveValue('abc');
  await expect(passwordInput).toHaveJSProperty('validity.tooShort', true);
  await expect(passwordInput).toHaveJSProperty('validity.valid', false);
});





 

