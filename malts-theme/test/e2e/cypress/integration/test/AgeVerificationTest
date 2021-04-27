const CookiesDialog = require('../../model/dialog/CookiesDialog');
const DobDialog = require('../../model/dialog/DobDialog');

describe('When the access page is loaded', () => {
  const date = new Date(Date.now());
  const minLegalAge = 19;
  const maxDialogAge = 88;
  const minDialogAge = 15;

  it('should be possible to close the cookie dialog', () => {
    cy.visit('https://maltsglobal.diageoplatform.com/en-gb/');
    cy.clearCookie('diageo-gateway').should('be.null');
    cy.clearCookie('ag-sso').should('be.null');
    cy.clearCookie('OptanonAlertBoxClosed').should('be.null');
    const dialog = new CookiesDialog();
    dialog.closeDialog();
    cy.xpath(dialog.xpathForDialog()).should('not.be.visible');
  });

  it('country field is visible', () => {
    const dobDialog = new DobDialog();
    cy.xpath(dobDialog.xpathForLocation()).should('be.visible');
  });

  it('should not be able to submit a blank age form', () => {
    const dobDialog = new DobDialog();
    dobDialog.clickEnter();
    // check if error exist and check error message is correct
    const error = dobDialog.getError();
    error.should('be.visible');
    error.should('contain', 'Please enter your date of birth');
  });

  it('should not be able to enter a wrong date', () => {
    const wrongDate = new Date(2000, 2, 31);
    const dobDialog = new DobDialog();
    dobDialog.selectDate(wrongDate);
    dobDialog.clickEnter();
    // check if error exist and check error message is correct
    const error = dobDialog.getError();
    error.should('be.visible');
    error.should('contain', 'Sorry, please enter a valid date');
  });

  it('will not be given access with age below 19 years', () => {
    const underAge = Math.floor(Math.random() * (minLegalAge - minDialogAge) + minDialogAge);
    const dob = date.setFullYear(date.getFullYear() - underAge); // sets dob year to underage
    const dobDialog = new DobDialog();
    dobDialog.selectDate(dob);
    dobDialog.clickEnter();
    // check if error exist and check error message is correct
    const error = dobDialog.getError();
    error.should('be.visible');
    error.should('contain', 'Sorry, your age or location does not permit you to enter at this time.');
  });

  it('will be given access with age above 19 years', () => {
    const legalAge = Math.floor(Math.random() * (maxDialogAge - minLegalAge) + minLegalAge);
    const dob = date.setFullYear(date.getFullYear() - legalAge); // sets dob year to legal age
    const dobDialog = new DobDialog();
    dobDialog.selectDate(dob);
    dobDialog.clickEnter();
    const error = dobDialog.getError();
    error.should('not.be.visible');
  });
});
