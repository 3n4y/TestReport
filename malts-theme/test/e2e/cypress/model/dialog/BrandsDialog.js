class BrandsDialog {
  constructor() {
    cy.waitUntil(() => cy.xpath(this.xpathForContainer()).should('be.visible'));
  }

  expectedTitle() {
    this.options = ['AUCHROISK', 'BENRINNES', 'BLAIR ATHOL', 'BRORA', 'CALEDONIAN', 'CAOL ILA', 'CARDHU', 'CLYNELISH', 'CONVALMORE', 'CRAGGANMORE', 'DAILUAINE', 'DALWHINNIE', 'GLEN ELGIN', 'GLENKINCHIE', 'GLENLOSSIE', 'GLEN SPEY', 'INCHGOWER', 'KNOCKANDO', 'LAGAVULIN', 'LINKWOOD', 'MANNOCHMORE', 'MORTLACH', 'OBAN', 'PITTYVAICH', 'PORT ELLEN', 'ROYAL LOCHNAGAR', 'STRATHMILL', 'TALISKER', 'TEANINICH', 'THE SINGLETON'];
    return this.options;
  }

  xpathForContainer() {
    this.xpath = '//*[contains(@class,"dropdown") and .//*[.="Brands"]]//*[contains(@class,"container-fluid")]';
    return this.xpath;
  }

  xpathForOptions() {
    this.xpath = `${this.xpathForContainer()}//li`;
    return this.xpath;
  }
}
export default BrandsDialog;
