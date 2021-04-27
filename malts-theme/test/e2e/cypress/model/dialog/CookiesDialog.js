class CookiesDialog {
  constructor() {
    cy.waitUntil(() => cy.xpath(this.xpathForDialog(), { timeout: 10000 }).should('be.visible'));
  }

  closeDialog() {
    cy.xpath(this.xpathForCloseButton()).click();
    cy.waitUntil(() => cy.xpath(this.xpathForDialog()).should('not.be.visible'));
  }

  manageCookies() {
    cy.xpath(this.xpathForManageCookies()).click();
  }

  acceptAllCookies() {
    cy.xpath(this.xpathForAcceptAllCookies()).click();
    cy.waitUntil(() => cy.xpath(this.xpathForDialog()).should('not.be.visible'));
  }

  xpathForDialog() {
    this.xpath = '//*[@class="ot-sdk-container"]';
    return this.xpath;
  }

  xpathForCloseButton() {
    this.xpath = '//*[@id="onetrust-close-btn-container"]//*[@aria-label ="Close"]';
    return this.xpath;
  }

  xpathForManageCookies() {
    this.xpath = '//button[contains(.,"Manage Cookies")]';
    return this.xpath;
  }

  xpathForAcceptAllCookies() {
    this.xpath = '//button[contains(.,"Accept All Cookies")]';
    return this.xpath;
  }
}
export default CookiesDialog;
