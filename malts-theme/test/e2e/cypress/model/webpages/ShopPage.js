import FloatingHeader from '../menu/FloatingHeader';
import ProductPage from './ProductPage';

class ShopPage {
  constructor() {
    this.floatingHeader = new FloatingHeader();
  }

  addProductByIndexToBasket(index) {
    cy.xpath(this.xpathForAvailableProductByIndex(index)).trigger('mouseover').should('be.visible');
    cy.xpath(this.xpathForAddToBasketButton(index)).click();
  }

  selectProduct(index) {
    cy.xpath(this.xpathForAvailableProductByIndex(index)).click();
    return new ProductPage();
  }

  getAllProducts() {
    cy.xpath(this.xpathForAllProducts());
  }

  getSpecificProduct(name) {
    cy.xpath(this.xpathForSpecificProduct(name));
  }

  getSpecificProductByIndex(index) {
    cy.xpath(this.xpathForSpecificProduct(index));
  }

  xpathForAllProducts() {
    this.xpath = '//*[@class="product-grid row"]//*[contains(@class,"p-0 mb-3")]';
    return this.xpath;
  }

  xpathForAvailableProducts() {
    this.xpath = '(//*[@class="product-grid row"]//*[contains(@class,"p-0 mb-3") and .//*[@class="shopifyForm d-flex flex-column " and not(contains(., "Out of Stock"))]])';
    return this.xpath;
  }

  xpathForAvailableProductByIndex(index) {
    let indexFix = index;
    if (indexFix === 0) { // index for xpath cannot be 0
      indexFix += 1;
    }
    this.xpath = `(${this.xpathForAvailableProducts()})[${indexFix}]`;
    return this.xpath;
  }

  xpathForAvailableProductTitleByIndex(index) {
    this.xpath = `${this.xpathForAvailableProductByIndex(index)}//*[contains(@class,"tile-title")]`;
    return this.xpath;
  }

  xpathForAvailableProductPriceByIndex(index) {
    this.xpath = `${this.xpathForAvailableProductByIndex(index)}//*[@class="shopify-form-component-module--price--NF61a"]`;
    return this.xpath;
  }

  xpathForSpecificProduct(name) {
    this.xpath = `//*[@class="product-grid row"]//*[contains(@class,"p-0 mb-3") and .//*[text()="${name}"]]`;
    return this.xpath;
  }

  xpathForAddToBasketButton(index) {
    this.xpath = `${this.xpathForAvailableProductByIndex(index)}//button`;
    return this.xpath;
  }

  xpathForPersonalizeButton(index) {
    this.xpath = `${this.xpathForAvailableProductByIndex(index)}//*[contains(@class,"Personalize")]`;
    return this.xpath;
  }
}
export default ShopPage;
