import ShopDialog from '../dialog/ShopDialog';
import CartDialog from '../dialog/CartDialog';
import BrandsDialog from '../dialog/BrandsDialog';
import WhiskyGuideDialog from '../dialog/WhiskyGuideDialog';
import ToursDialog from '../dialog/ToursDialog';
import RegionsDialog from '../dialog/RegionsDialog';

class FloatingHeader {
  constructor() {
    cy.waitUntil(() => cy.xpath(this.xpathForContainer(), { timeout: 10000 }).should('be.visible'));
  }

  clickHomeTab() {
    cy.xpath(this.xpathForHomeTab()).click();
  }

  clickShopTab() {
    cy.xpath(this.xpathForShopTab()).click();
  }

  clickBrandsTab() {
    cy.xpath(this.xpathForBrandsTab()).click();
  }

  clickGiftsTab() {
    cy.xpath(this.xpathForGiftsTab()).click();
  }

  clickWhiskeyGuideTab() {
    cy.xpath(this.xpathForWhiskeyGuideTab()).click();
  }

  clickToursTab() {
    cy.xpath(this.xpathForToursTab()).click();
  }

  clickSearch() {
    cy.xpath(this.xpathForSearchIcon()).click();
  }

  clickUserIcon() {
    cy.xpath(this.xpathForUserTab()).click();
  }

  clickCartIcon() {
    cy.xpath(this.xpathForCartTab()).click();
    return new CartDialog();
  }

  mouseOverShopTab() {
    this.mouseOverMenu(this.xpathForShopTab());
    return new ShopDialog();
  }

  mouseOverBrandsTab() {
    this.mouseOverMenu(this.xpathForBrandsTab());
    return new BrandsDialog();
  }

  mouseOverWhiskeyGuideTab() {
    this.mouseOverMenu(this.xpathForWhiskeyGuideTab());
    return new WhiskyGuideDialog();
  }

  mouseOverToursTab() {
    this.mouseOverMenu(this.xpathForToursTab());
    return new ToursDialog();
  }

  mouseOverRegionTab() {
    this.mouseOverMenu(this.xpathForRegionTab());
    return new RegionsDialog();
  }

  mouseOverMaltsLogo() {
    cy.xpath(this.xpathForMaltsLogo()).should('be.visible').trigger('mouseover');
  }

  mouseOverMenu(xpath) {
    cy.xpath(xpath).should('be.visible').trigger('mouseover', { timeout: 6000 }).invoke('attr', 'class')
      .should('contain', 'show');
    return this;
  }

  expectedTabNames() {
    this.names = ['HOME', 'SHOP', 'BRANDS', 'GIFTS', 'WHISKY GUIDE', 'TOURS'];
    return this.names;
  }

  expectedTabNames() {
    this.names = ['HOME', 'SHOP', 'BRANDS', 'GIFTS', 'WHISKY GUIDE', 'TOURS'];
    return this.names;
  }

  xpathForContainer() {
    this.xpath = '//nav[contains(@class,"navbar")]';
    return this.xpath;
  }

  xpathForMaltsLogo() {
    this.xpath = `${this.xpathForContainer()}//*[@class="d-block h-100"]`;
    return this.xpath;
  }

  xpathForHomeTab() {
    this.xpath = `${this.xpathForContainer()}//*[@class="nav-item" and .="Home"]`;
    return this.xpath;
  }

  xpathForShopTab() {
    this.xpath = `${this.xpathForDropDownTabs('Shop')}`;
    return this.xpath;
  }

  xpathForBrandsTab() {
    this.xpath = `${this.xpathForDropDownTabs('Brands')}`;
    return this.xpath;
  }

  xpathForWhiskeyGuideTab() {
    this.xpath = `${this.xpathForDropDownTabs('Whisky Guide')}`;
    return this.xpath;
  }

  xpathForToursTab() {
    this.xpath = `${this.xpathForDropDownTabs('Tours')}`;
    return this.xpath;
  }

  xpathForGiftsTab() {
    this.xpath = `${this.xpathForContainer()}//*[@class="nav-item" and .="Gifts"]`;
    return this.xpath;
  }

  xpathForSearchIcon() {
    this.xpath = `${this.xpathForContainer()}//*[contains(@class,"navbar-component-module--icon")]`;
    return this.xpath;
  }

  xpathForRegionTab() {
    this.xpath = `${this.xpathForContainer()}//*[@class="d-none d-lg-block"]//*[@class="dropdown"]`;
    return this.xpath;
  }

  xpathForUserTab() {
    this.xpath = `${this.xpathForContainer()}//*[@class="svgLink"]`;
    return this.xpath;
  }

  xpathForCartTab() {
    this.xpath = `${this.xpathForContainer()}//*[contains(@class,"cart-module--qtyCart")]/parent::*/..`;
    return this.xpath;
  }

  xpathForCartQuantity() {
    this.xpath = `${this.xpathForContainer()}//*[contains(@class,"cart-module--qtyCart")]`;
    return this.xpath;
  }

  xpathForDropDownTabs(name) {
    this.xpath = `${this.xpathForContainer()}//*[contains(@class,"hover-controlled-dropdown") and .//*[.="${name}"]]`;
    return this.xpath;
  }

  xpathForDropDownContent(name) {
    this.xpath = `//*[contains(@class,"dropdown") and .//*[.="${name}"]]//*[contains(@class,"container-fluid")]`;
    return this.xpath;
  }

  xpathForRegionsDialog() {
    this.xpath = `${this.xpathForContainer()}//*[@class="dropdown-menu show"]`;
    return this.xpath;
  }

  xpathForNavigationTabs() {
    this.xpath = `${this.xpathForContainer()}//*[contains(@class,"nav-link")]`;
    return this.xpath;
  }
}

export default FloatingHeader;
