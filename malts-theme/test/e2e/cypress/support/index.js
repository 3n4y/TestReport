// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
require('cypress-commands');
// Add support for using xpath
require('cypress-xpath');

// likely want to do this in a support file
// so it's applied to all spec files
// cypress/support/index.js

// Reduces false positives
Cypress.on('uncaught:exception', () => false);

// Preserve cookies between tests. Cypress auto deletes cookies after each test
// The cookie dialog will keep popping up on every page if this is not preserved
Cypress.Cookies.defaults({
  preserve: () => true,
});
