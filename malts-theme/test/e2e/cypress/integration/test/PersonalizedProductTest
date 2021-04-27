import HomePage from '../../model/webpages/HomePage';
import ShopPage from '../../model/webpages/ShopPage';
import Utilities from '../../model/Utilities';

describe('For personalized Products', () => {
  beforeEach(() => {
    cy.visit('/en-gb');
  });

  it('should be possible to add engraved message to product', { retries: 1 }, () => {
    cy.visit('/en-gb');
    const homePage = new HomePage();
    window.sessionStorage.setItem('newsletter-signup', 'true');
    homePage.header.mouseOverShopTab().clickPersonalizedProducts();
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
        cy.log(`Product selected is ${productName}`);
        // Open product page
        const productPage = shopPage.selectProduct(randomIndex);
        // confirm the right product page is opened
        cy.xpath(productPage.xpathForProductTitle()).then(($title) => {
          const title = $title.text();
          cy.log(`product title is ${title}`);
          expect(productName).to.equal(title, 'Product page opened is correct');
        });
        // Add engraving to product
        productPage.selectEngraved();
        let engraveDialog = productPage.clickAddMessage();
        engraveDialog.clickMessageContainer();
        cy.xpath(engraveDialog.xpathForChooseYourMessageDropDownOptions()).then(($elements) => {
          const randomOption = Math.floor(Math.random() * $elements.length);
          engraveDialog.selectOption($elements[randomOption].innerText);
          engraveDialog.clickConfirmCheckBox().clickSaveMessage();
          cy.xpath(productPage.xpathForEngravingMessage()).text().should('equal', `Engraving: ${$elements[randomOption].innerText}`);
          // Add heart Icon to message
          engraveDialog = productPage.clickAddMessage();
          engraveDialog.checkAddHeartIcon().clickConfirmCheckBox().clickSaveMessage();
          cy.xpath(productPage.xpathForEngravingMessage()).text().should('equal', `Engraving: ${$elements[randomOption].innerText}♥︎`);
          // Add engraved to basket
          const cartDialog = productPage.clickAddToBasket();
          // Assert dialog engraved text
          cy.xpath(cartDialog.xpathForEngravedMessage()).text().should('equal', `Engraving : ${$elements[randomOption].innerText}'HEART'`);
        });
      });
    });
  });

  it('should be possible to add engraved initials to product', { retries: 1 }, () => {
    const homePage = new HomePage();
    homePage.header.mouseOverShopTab().clickPersonalizedProducts();
    const shopPage = new ShopPage();
    // waits for product price to load
    cy.waitUntil(() => cy.xpath(shopPage.xpathForAvailableProducts(), { timeout: 30000 }).should('be.visible'));
    // get random product
    cy.xpath(shopPage.xpathForAvailableProducts()).should('be.visible').its('length').then(($length) => {
      const randomIndex = Utilities.randomGenerator($length);
      cy.log(`Element count is: ${$length} while random element number is ${randomIndex}`);

      // Open product page
      const productPage = shopPage.selectProduct(randomIndex);
      productPage.selectEngraved();
      let engraveDialog = productPage.clickAddMessage();
      // select random initials
      const initialA = Math.random().toString(36).substr(2, 1);
      const initialB = Math.random().toString(36).substr(2, 1);
      const initialC = Math.random().toString(36).substr(2, 1);
      // Enter only two initials and save
      engraveDialog.clickInitialsContainer()
        .enterInitials1(initialA)
        .clickUseInitials()
        .enterInitials2(initialB);
      engraveDialog.clickConfirmCheckBox().clickSaveInitials();
      cy.log(`Random characters is: ${initialA} ${initialB}`);
      cy.xpath(productPage.xpathForEngravingMessage()).text().should('equal', `Engraving: ${initialA}.${initialB}.`);
      // Enter three initials and save
      engraveDialog = productPage.clickAddMessage();
      engraveDialog.clickInitialsContainer()
        .enterInitials1(initialA)
        .clickUseInitials()
        .enterInitials2(initialB)
        .enterInitials3(initialC);
      engraveDialog.clickConfirmCheckBox().clickSaveInitials();
      cy.log(`Random characters is: ${initialA} ${initialB} ${initialC}`);
      cy.xpath(productPage.xpathForEngravingMessage()).text().should('equal', `Engraving: ${initialA}.${initialB}.${initialC}.`);
      // Add heart icon to initials
      engraveDialog = productPage.clickAddMessage();
      engraveDialog.clickUseHeart().clickConfirmCheckBox().clickSaveInitials();
      cy.xpath(productPage.xpathForEngravingMessage()).text().should('equal', `Engraving: ${initialA}♥︎${initialC}`);
      // Add engraved to basket
      const cartDialog = productPage.clickAddToBasket();
      // Assert dialog engraved text
      cy.xpath(cartDialog.xpathForEngravedMessage()).text().should('equal', `Engraving : ${initialA}'HEART'${initialC}`);
    });
  });
});
