import CheckoutPage from '../webpages/CheckoutPage';

class CartDialog {
  constructor() {
    cy.waitUntil(() => cy.xpath(this.xpathForDialog()).should('be.visible'));
  }

  clickContinueShopping() {
    cy.xpath(this.xpathForContinueBrowsing()).click();
    cy.waitUntil(() => cy.xpath(this.xpathForDialog()).should('not.be.visible'));
  }

  clickCheckOutAsGuest() {
    cy.xpath(this.xpathForCheckoutAsGuest()).click();
    return new CheckoutPage();
  }

  increaseProductQuantity() {
    this.changeQuantity(this.xpathForIncreaseButton(this.xpathForSingleProduct()));
  }

  decreaseProductQuantity() {
    this.changeQuantity(this.xpathForDecreaseButton(this.xpathForSingleProduct()));
  }

  changeQuantity(xpath) {
    // get the initial value of your object
    cy.xpath(this.xpathForProductQuantity(this.xpathForSingleProduct())).text()
      .then(($initialVal) => {
        // It's better if you can do your click operation here due to cypress asynchronous commands
        cy.xpath(xpath).click();
        // Wait until the element changes
        cy.waitUntil(() => cy.xpath(this.xpathForProductQuantity(this.xpathForSingleProduct()))
          .text()
          .then(($newVal) => $newVal !== $initialVal),
        // optional timeouts and error messages
        {
          errorMsg: `was expecting some other Value but got : ${$initialVal}`,
          timeout: 10000,
          interval: 500,
        }).then(() => {
          cy.log('Found a difference in values');
        });
      });
  }

  xpathForDialog() {
    this.xpath = '//*[contains(@class,"cartDrawer")]';
    return this.xpath;
  }

  xpathForTitle() {
    this.xpath = `${this.xpathForDialog()}//h3`;
    return this.xpath;
  }

  xpathForProductContainerByName(name) {
    this.xpath = `${this.xpathForDialog()}//*[contains(@class,"line-item-module") and .//*[@class="container row" and  .//*[text()="${name}"]]]`;
    return this.xpath;
  }

  xpathForSingleProduct() {
    this.xpath = `${this.xpathForDialog()}//*[contains(@class,"line-item-module") and .//*[@class="container row"]]`;
    return this.xpath;
  }

  xpathForProductAmountByName(name) {
    this.xpath = `${this.xpathForProductContainerByName(name)}//*[contains(@class,"productPrice")]`;
    return this.xpath;
  }

  xpathForProductPrice(xpath) {
    this.xpath = `${xpath}//*[contains(@class,"productPrice")]`;
    return this.xpath;
  }

  xpathForProductName() {
    this.xpath = `${this.xpathForSingleProduct()}//*[contains(@class,"line-item-module--productTitle")]`;
    return this.xpath;
  }

  xpathForContinueBrowsing() {
    this.xpath = `${this.xpathForDialog()}//*[contains(@class,"cart-module--back_arrow")]`;
    return this.xpath;
  }

  xpathForDecreaseButton(xpath) {
    this.xpath = `(${xpath}//*[@class="btn btn-gray"])[1]`;
    return this.xpath;
  }

  xpathForIncreaseButton(xpath) {
    this.xpath = `(${xpath}//*[@class="btn btn-gray"])[2]`;
    return this.xpath;
  }

  xpathForProductQuantity(xpath) {
    this.xpath = `${xpath}//*[contains(@class,"quantity-control-module")]//span`;
    return this.xpath;
  }

  xpathForCheckoutAsGuest() {
    this.xpath = `${this.xpathForDialog()}//button[.="Check out as Guest"]`;
    return this.xpath;
  }

  xpathForEngravedMessage() {
    this.xpath = `${this.xpathForDialog()}//*[@class="customAttribute"]`;
    return this.xpath;
  }
}
export default CartDialog;
