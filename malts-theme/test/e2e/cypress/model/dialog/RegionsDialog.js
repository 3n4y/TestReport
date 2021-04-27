class RegionsDialog {
  constructor() {
    cy.waitUntil(() => cy.xpath(this.xpathForDialog()).should('be.visible'));
  }

  selectGreatBritain() {
    cy.xpath(this.xpathForRegion('Great Britain')).click();
  }

  selectDeutschland() {
    cy.xpath(this.xpathForRegion('Deutschland')).click();
  }

  selectAustralia() {
    cy.xpath(this.xpathForRegion('Australia')).click();
  }

  selectUnitedStates() {
    cy.xpath(this.xpathForRegion('United States')).click();
  }

  selectRestOfTheWorld() {
    cy.xpath(this.xpathForRegion('Rest of World')).click();
  }

  expectedRegions() {
    this.options = ['Great Britain', 'Deutschland', 'Australia', 'United States', 'Rest of World'];
    return this.options;
  }

  xpathForDialog() {
    this.xpath = '//*[@class="dropdown-menu show"]';
    return this.xpath;
  }

  xpathForRegion(name) {
    this.xpath = `${this.xpathForDialog()}//*[contains(@class,"region-selector") and text()="${name}"]`;
    return this.xpath;
  }

  xpathForOptions() {
    this.xpath = `${this.xpathForDialog()}//*[@class="dropdown-item"]`;
    return this.xpath;
  }
}
export default RegionsDialog;
