import HomePage from '../../model/webpages/HomePage';
import ShopPage from '../../model/webpages/ShopPage';
import CartDialog from '../../model/dialog/CartDialog';
import Utilities from '../../model/Utilities';

describe('When shopping', () => {
  it('should be possible to check out the correct single product', { retries: 1 }, () => {
    cy.visit('/en-gb');
    const homePage = new HomePage();
    window.sessionStorage.setItem('newsletter-signup', 'true');
    homePage.header.mouseOverShopTab().clickAllProducts();
    const shopPage = new ShopPage();
    // waits for product price to load
    cy.waitUntil(() => cy.xpath(shopPage.xpathForAvailableProducts(), { timeout: 30000 }).should('be.visible'));
    // get random product
    cy.xpath(shopPage.xpathForAvailableProducts()).should('be.visible').its('length').then(($length) => {
      const randomIndex = Utilities.randomGenerator($length);
      cy.log(`Element count is: ${$length} while random element number is ${randomIndex}`);
      // Get Product name from shop
      cy.xpath(shopPage.xpathForAvailableProductTitleByIndex(randomIndex)).then(($element) => {
        const productName = $element.text().trim();
        // Add product to cart
        shopPage.addProductByIndexToBasket(randomIndex);
        const cartDialog = new CartDialog();
        // Verify cart product name
        cy.xpath(cartDialog.xpathForProductName()).then(($name) => {
          const cartName = $name.text().trim();
          expect(cartName.toLowerCase()).to.contain(productName
            .substr(0, cartName.length).toLowerCase());
          // verify correct product count in header
          cy.xpath(shopPage.floatingHeader.xpathForCartQuantity()).then(($qty) => {
            cy.wrap($qty).should('be.visible');
            expect(parseInt($qty.text(), 10)).to.equal(1);
          });
        });
        // Verify cart and shop product price
        cy.xpath(cartDialog.xpathForProductPrice(cartDialog.xpathForSingleProduct()))
          .then(($price) => {
            const cartPrice = $price.text().trim();
            // Get shop product price
            cy.xpath(shopPage.xpathForAvailableProductPriceByIndex(randomIndex)).then(($text) => {
              const shopPrice = $text.text().replace(',', '');// trims out thousand comma separator
              expect(cartPrice).to.equal(shopPrice.substr(0, cartPrice.length));
              cartDialog.clickContinueShopping();
            });
          });
      });
    });
  });

  it('should be possible to increase product quantity in cart using buttons', () => {
    const shopPage = new ShopPage();
    const cartDialog = shopPage.floatingHeader.clickCartIcon();
    // Get default values single product in cart
    // Get product price
    cy.xpath(cartDialog.xpathForProductPrice(cartDialog.xpathForSingleProduct())).then(($price) => {
      const price = parseFloat($price.text().trim().replace('£', '')); // remove currency symbol
      // get product quantity
      cy.xpath(cartDialog.xpathForProductQuantity(cartDialog.xpathForSingleProduct()))
        .then(($quantity) => {
          const quantity = parseInt($quantity.text().trim(), 10);
          const unitPrice = price / quantity;
          // Increase product quantity by two
          let i;
          const quantityIncrease = 2;
          for (i = 0; i < quantityIncrease; i += 1) {
            cartDialog.increaseProductQuantity();
          }
          // Get total quantity after increase
          cy.xpath(cartDialog.xpathForProductQuantity(cartDialog.xpathForSingleProduct()))
            .then(($newQuantity) => {
              const newQuantity = parseInt($newQuantity.text().trim(), 10);
              const expectedQuantity = quantity + quantityIncrease;
              expect(newQuantity).to.equal(expectedQuantity);
              // Get total price after increase
              cy.xpath(cartDialog.xpathForProductPrice(cartDialog.xpathForSingleProduct()))
                .then(($newPrice) => {
                  const newPrice = parseFloat($newPrice.text().trim().replace('£', ''));
                  const expectedPrice = newQuantity * unitPrice;
                  expect(newPrice).to.equal(Utilities.roundAccurately(expectedPrice, 2));
                  cartDialog.clickContinueShopping(); // to close the dialog
                });
            });
        });
    });
  });

  it('should be possible to reduce product quantity in cart using buttons', () => {
    const shopPage = new ShopPage();
    const cartDialog = shopPage.floatingHeader.clickCartIcon();
    cy.xpath(cartDialog.xpathForProductPrice(cartDialog.xpathForSingleProduct())).then(($price) => {
      const price = parseFloat($price.text().trim().replace('£', '')); // remove currency symbol
      // get product quantity
      cy.xpath(cartDialog.xpathForProductQuantity(cartDialog.xpathForSingleProduct()))
        .then(($quantity) => {
          const quantity = parseInt($quantity.text().trim(), 10);
          const unitPrice = price / quantity;
          // Reduce product quantity by one
          let i;
          const quantityDecrease = 1;
          for (i = 0; i < quantityDecrease; i += 1) {
            cartDialog.decreaseProductQuantity();
          }
          // Get total quantity after decrease
          cy.xpath(cartDialog.xpathForProductQuantity(cartDialog.xpathForSingleProduct()))
            .then(($newQuantity) => {
              const newQuantity = parseInt($newQuantity.text().trim(), 10);
              const expectedQuantity = quantity - quantityDecrease;
              expect(newQuantity).to.equal(expectedQuantity);
              // Get total price after increase
              cy.xpath(cartDialog.xpathForProductPrice(cartDialog.xpathForSingleProduct()))
                .then(($newPrice) => {
                  const newPrice = parseFloat($newPrice.text().trim().replace('£', ''));
                  const expectedPrice = newQuantity * unitPrice;
                  expect(newPrice).to.equal(Utilities.roundAccurately(expectedPrice, 2));
                  cartDialog.clickContinueShopping(); // to close the dialog
                });
            });
        });
    });
  });

  it('should display product name and price on the same line', () => {
    const shopPage = new ShopPage();
    // waits for product price to load
    cy.waitUntil(() => cy.xpath(shopPage.xpathForAvailableProducts(), { timeout: 10000 }).should('be.visible'));
    // get random product
    cy.xpath(shopPage.xpathForAvailableProducts()).should('be.visible').its('length').then(($length) => {
      const randomIndex = Utilities.randomGenerator($length);
      cy.log(`Element count is: ${$length} while random element number is ${randomIndex}`);
      // Get Product name y coordinate from shop
      cy.xpath(shopPage.xpathForAvailableProductTitleByIndex(randomIndex)).then(($element) => {
        const nameCoordinate = $element[0].getBoundingClientRect();
        // Get product price coordinate from price
        cy.xpath(shopPage.xpathForAvailableProductPriceByIndex(randomIndex)).then(($price) => {
          const priceCoordinate = $price[0].getBoundingClientRect();
          expect(nameCoordinate.y).to.equal(priceCoordinate.y);
        });
      });
    });
  });
});
