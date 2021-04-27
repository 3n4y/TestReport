import FloatingHeader from '../../model/menu/FloatingHeader';
import Utilities from '../../model/Utilities';
import HomePage from '../../model/webpages/HomePage';

describe('Skyscraper Menu', () => {
  beforeEach(() => {
    cy.visit('/en-gb');
  });

  it('should display the correct tabs and Icons', () => {
    const floatingHeader = new FloatingHeader();

    const tabNames = 'tabs.txt';
    Utilities.getElementsTextAndStoreInFile(floatingHeader.xpathForNavigationTabs(), tabNames);
    cy.log(`Expected tabs are: ${floatingHeader.expectedTabNames()}`);
    cy.fixture(tabNames).then(($text) => {
      cy.log(`Tab file contents are : ${$text}`);
      expect($text.split(',')).to.have.members(floatingHeader.expectedTabNames());
    });
    // check malts logo is visible and link is correct
    cy.xpath(floatingHeader.xpathForMaltsLogo()).should('be.visible').invoke('attr', 'href')
      .should('equal', '/en-gb/');
    // Check search Icon is displayed
    cy.xpath(floatingHeader.xpathForSearchIcon()).should('be.visible');
    // Check Region is displayed
    cy.xpath(floatingHeader.xpathForRegionTab()).should('be.visible');
    // Check user Icon is displayed
    cy.xpath(floatingHeader.xpathForUserTab()).should('be.visible');
    // Cart icon is displayed
    cy.xpath(floatingHeader.xpathForCartTab()).should('be.visible');
  });

  it('mouse over Shop displays dropdown dialog with correct options', { retries: 1 }, () => {
    const homePage = new HomePage();
    const shopDialog = homePage.header.mouseOverShopTab();
    const shopDialogTitleNames = 'shop.txt';
    cy.fixture(Utilities.getElementsTextAndStoreInFile(shopDialog
      .xpathForTitles(), shopDialogTitleNames))
      .then(($text) => {
        cy.log(`Shop contents are ${$text}`);
        expect($text.split(',')).to.have.members(shopDialog.expectedTitles());
      });
  });

  it('mouse over Brands displays dropdown dialog with correct options', { retries: 1 }, () => {
    const homePage = new HomePage();
    const brandsDialog = homePage.header.mouseOverBrandsTab();
    const brandTitleNames = 'brands.txt';
    cy.fixture(Utilities
      .getElementsTextAndStoreInFile(brandsDialog.xpathForOptions(), brandTitleNames))
      .then(($text) => {
        cy.log(`Brand contents are ${$text}`);
        expect($text.split(',')).to.have.members(brandsDialog.expectedTitle());
      });
  });

  it('mouse over Whisky Guide displays dropdown dialog with correct options', { retries: 1 }, () => {
    const homePage = new HomePage();
    const whiskyDialog = homePage.header.mouseOverWhiskeyGuideTab();
    const whiskyList = 'whiskyOptions.txt';
    cy.fixture(Utilities
      .getElementsTextAndStoreInFile(whiskyDialog.xpathForList(), whiskyList))
      .then(($text) => {
        cy.log(`Whisky contents are ${$text}`);
        expect($text.split(',')).to.have.members(whiskyDialog.expectedOptions());
      });
  });

  it('Mouse over Tours displays dropdown dialog with correct options', { retries: 1 }, () => {
    const homePage = new HomePage();
    const toursDialog = homePage.header.mouseOverToursTab();
    const toursList = 'tourOptions.txt';
    cy.fixture(Utilities
      .getElementsTextAndStoreInFile(toursDialog.xpathForOptions(), toursList))
      .then(($text) => {
        cy.log(`Whisky contents are ${$text}`);
        expect($text.split(',')).to.have.members(toursDialog.expectedOptions());
      });
  });

  it('Mouse over Regions displays dialog with correct options', { retries: 1 }, () => {
    const homePage = new HomePage();
    const regionsDialog = homePage.header.mouseOverRegionTab();
    const regionList = 'regions.txt';
    cy.fixture(Utilities
      .getElementsTextAndStoreInFile(regionsDialog.xpathForOptions(), regionList))
      .then(($text) => {
        cy.log(`Region contents are ${$text}`);
        expect($text.split(',')).to.have.members(regionsDialog.expectedRegions());
      });
  });

  it('should always display floating menu and banner on scroll', () => {
    const homePage = new HomePage();
    // scroll to bottom and verify menu and banner are still displayed
    cy.scrollTo('bottom');
    Utilities.isElementDisplayedInWindow(homePage.header.xpathForContainer());
    Utilities.isElementDisplayedInWindow(homePage.banner.xpathForContainer());
  });
});
