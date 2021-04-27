class StayConnectedDialog {
  constructor() {
    cy.xpath(this.xpathForDialog(), { timeout: 10000 }).should('be.visible');
  }

  closeDialog() {
    cy.xpath(this.xpathForCloseButton()).click();
  }

  xpathForCloseButton() {
    this.xpath = `${this.xpathForDialog()}//button[contains(@class, "Close")]`;
    return this.xpath;
  }

  xpathForDialog() {
    this.xpath = '//*[@class="modal-content"]';
    return this.xpath;
  }
}
export default StayConnectedDialog;
