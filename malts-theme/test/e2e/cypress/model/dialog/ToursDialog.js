class ToursDialog {
  expectedOptions() {
    this.options = ['BLAIR ATHOL', 'CAOL ILA', 'CARDHU', 'CLYNELISH', 'CRAGGANMORE', 'DALWHINNIE', 'GLENKINCHIE', 'LAGAVULIN', 'OBAN', 'ROYAL LOCHNAGAR', 'TALISKER', 'THE SINGLETON OF GLEN ORD'];
    return this.options;
  }

  xpathForContainer() {
    this.xpath = '//*[contains(@class,"dropdown") and .//*[.="Tours"]]//*[contains(@class,"container-fluid")]';
    return this.xpath;
  }

  xpathForOptions() {
    this.xpath = `${this.xpathForContainer()}//li`;
    return this.xpath;
  }
}
export default ToursDialog;
