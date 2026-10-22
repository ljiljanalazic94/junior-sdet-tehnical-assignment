# PrestaShop Registration Tests

## Overview

This project contains an automated end-to-end tests for the user registration functionality on the PrestaShop demo website, using Playwright and TypeScript.

## Tech Stack

- Playwright
- TypeScript
- Node.js

## Prerequisites

- Node.js and npm installed

## Installation

Clone the repository and install the dependencies:


npm install
npx playwright install chromium


## Running the Tests

Run the registration test in headless mode:


   npx playwright test tests/registration.spec.ts


Run the test with a visible browser:


   npx playwright test tests/registration.spec.ts --headed


## Test Coverage

1. Successful Registration

- Opens the PrestaShop demo website.
- Navigates to the registration form.
- Fills in the required registration fields using a unique email address.
- Accepts the required consent checkboxes.
- Submits the registration form.
- Verifies that the registered user's account button is visible.
- Verifies that the Sign out option is displayed.

2. Registration with Empty Required Fields

- Opens the PrestaShop demo website.
- Navigates to the registration form.
- Attempts to submit the form without entering any data.
- Verifies that the first name, last name, email, and password fields are invalid.
- Confirms that the required-field validation prevents valid submission of an empty form.

3. Registration with an Invalid Email Address

- Opens the PrestaShop demo website.
- Navigates to the registration form.
- Fills in the required fields with valid data, except for the email address.
- Enters an invalid email address (invalid-email).
- Verifies that the browser marks the email field as invalid.
- Attempts to submit the registration form.
- Verifies that the email field remains invalid after the submission attempt.


4. Registration with a Password Shorter Than 8 Characters

- Opens the PrestaShop demo website.
- Navigates to the registration form.
- Enters a password shorter than the minimum required length of 8 characters.
- Verifies that the password field is marked as too short by browser validation.
- Verifies that the password field is considered invalid.

Note on Password Validation

While testing the password field, I noticed that the password feedback messages were inside a hidden HTML template and were not visible to Playwright. Since I couldn't reliably verify these messages, I used the browser's built-in validation instead.

The test checks that a password shorter than 8 characters is marked as too short and invalid. It verifies browser-level password length validation rather than the password strength messages displayed by the application.
