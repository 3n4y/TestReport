import PersonalizeDialog from '../dialog/PersonalizeDialog';
import CartDialog from '../dialog/CartDialog';

class ProductPage {
  selectEngraved() {
    cy.xpath(this.xpathForEngraved()).click();
  }

  clickAddMessage() {
    cy.xpath(this.xpathForAddMessageButton()).click();
    return new PersonalizeDialog();
  }

  clickAddToBasket() {
    cy.xpath(this.xpathForAddToBasket()).click();
    return new CartDialog();
  }

  xpathForProductTitle() {
    this.xpath = `${this.xpathForProductDetails()}//h1`;
    return this.xpath;
  }

  xpathForProductDetails() {
    this.xpath = '//*[@class="pt-2 row"]';
    return this.xpath;
  }

  xpathForPersonalizationOptions() {
    this.xpath = `${this.xpathForProductDetails()}//*[@class="productOptionValues"]`;
    return this.xpath;
  }

  xpathForNone() {
    this.xpath = `${this.xpathForPersonalizationOptions()}//*[@value = "None"]`;
    return this.xpath;
  }

  xpathForEngraved() {
    this.xpath = `${this.xpathForProductDetails()}//*[@value = "Engraved"]`;
    return this.xpath;
  }

  xpathForAddToBasket() {
    this.xpath = `${this.xpathForProductDetails()}//*[.= "Add Engraved To Basket"]`;
    return this.xpath;
  }

  xpathForAddMessageButton() {
    this.xpath = `${this.xpathForProductDetails()}//*[@name="launchButton"]`;
    return this.xpath;
  }

  xpathForQuantityDecrease() {
    this.xpath = `(${this.xpathForProductDetails()}//*[@class="btn btn-gray"])[1]`;
    return this.xpath;
  }

  xpathForQuantityIncrease() {
    this.xpath = `(${this.xpathForProductDetails()}//*[@class="btn btn-gray"])[2]`;
    return this.xpath;
  }

  xpathForEngravingMessage() {
    this.xpath = `${this.xpathForProductDetails()}//*[contains(@class,"engravingFinal")]`;
    return this.xpath;
  }
}
export default ProductPage;
