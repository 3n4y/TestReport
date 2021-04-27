class ShopDialog {
  constructor() {
    cy.waitUntil(() => cy.xpath(this.xpathForContainer()).should('be.visible'));
  }

  clickAllProducts() {
    cy.xpath(this.xpathForListItem('All Products')).click();
  }

  clickPersonalizedProducts() {
    cy.xpath(this.xpathForListItem('Personalised Products')).click();
  }

  expectedTitles() {
    this.titles = ['ALL PRODUCTS', 'OFFERS', 'WHISKY GIFTS', 'NEW PRODUCTS', 'RARE AND EXCEPTIONAL', 'PERSONALISED PRODUCTS', 'ICONIC MALTS', 'FLAVOUR', 'LIMITED EDITIONS', 'BLENDED SCOTCH WHISKY', 'WORLD WHISKEY'];
    return this.titles;
  }

  xpathForContainer() {
    this.xpath = '//*[contains(@class,"dropdown") and .//*[.="Shop"]]//*[contains(@class,"container-fluid")]';
    return this.xpath;
  }

  xpathForListItem(name) {
    this.xpath = `${this.xpathForContainer()}//*[text() = "${name}"]`;
    return this.xpath;
  }

  xpathForTitles() {
    this.xpath = `${this.xpathForContainer()}//*[contains(@class,"navbar-component-module--title")]`;
    return this.xpath;
  }
}
export default ShopDialog;
