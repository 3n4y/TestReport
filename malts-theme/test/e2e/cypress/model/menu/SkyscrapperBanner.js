class SkyscraperBanner {
  constructor() {
    cy.waitUntil(() => cy.xpath(this.xpathForContainer()).should('be.visible'));
  }

  getBannerText() {
    return cy.xpath(this.xpathForContainer());
  }

  xpathForContainer() {
    this.xpath = '//*[contains(@class,"announcebar")]';
    return this.xpath;
  }
}
export default SkyscraperBanner;
