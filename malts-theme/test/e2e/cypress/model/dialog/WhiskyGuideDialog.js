class WhiskyGuideDialog {
  clickWhiskyTypes() {
    cy.xpath(this.xpathForDropDownItems('Whisky Types')).click();
  }

  clickTheMaking() {
    cy.xpath(this.xpathForDropDownItems('The Making')).click();
  }

  clickTheFlavour() {
    cy.xpath(this.xpathForDropDownItems('The Flavour')).click();
  }

  clickTheTasting() {
    cy.xpath(this.xpathForDropDownItems('The Tasting')).click();
  }

  clickTheHistory() {
    cy.xpath(this.xpathForDropDownItems('The History')).click();
  }

  clickTheLingo() {
    cy.xpath(this.xpathForDropDownItems('The Lingo')).click();
  }

  expectedOptions() {
    this.options = ['WHISKY TYPES', 'THE MAKING', 'THE FLAVOUR', 'THE TASTING', 'THE HISTORY', 'THE LINGO'];
    return this.options;
  }

  xpathForDropDownItems(name) {
    this.xpath = `${this.xpathForContainer()}//*[contains(@class,"menu-list") and .="${name}"]`;
    return this.xpath;
  }

  xpathForContainer() {
    this.xpath = '//*[contains(@class,"dropdown") and .//*[.="Whisky Guide"]]//*[contains(@class,"container-fluid")]';
    return this.xpath;
  }

  xpathForList() {
    this.xpath = `${this.xpathForContainer()}//*[contains(@class,"menu-list")]`;
    return this.xpath;
  }
}
export default WhiskyGuideDialog;
