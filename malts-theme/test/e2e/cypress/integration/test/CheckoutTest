import HomePage from '../../model/webpages/HomePage';
import ShopPage from '../../model/webpages/ShopPage';
import CartDialog from '../../model/dialog/CartDialog';
import Utilities from '../../model/Utilities';

describe('For product checkout with desktop or mobile', () => {
  it('buttons to display properly', { retries: 1 }, () => {
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
              const checkoutPage = cartDialog.clickCheckOutAsGuest();
              // inspect buttons
              Utilities.doElementsOverlap(checkoutPage.xpathForContinueShopping(),
                checkoutPage.xpathForContinueToDeliveryButton());
              cy.viewport('iphone-x');
              Utilities.doElementsOverlap(checkoutPage.xpathForContinueToDeliveryButton(),
                checkoutPage.xpathForContinueShopping());
            });
          });
      });
    });
  });
});
