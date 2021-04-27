class DobDialog {
  constructor() {
    cy.waitUntil(() => cy.xpath(this.xpathForDialog(), { timeout: 10000 }).should('be.visible'));
  }

  selectDay(day) {
    cy.xpath(this.xpathForDay()).select(day);
  }

  selectMonth(month) {
    cy.xpath(this.xpathForMonth()).select(month);
  }

  selectDate(date) {
    const dob = new Date(date);
    this.selectDay(dob.getDate().toString());
    this.selectMonth(dob.getMonth().toString());
    this.selectYear(dob.getFullYear().toString());
  }

  selectYear(year) {
    cy.xpath(this.xpathForYear()).select(year);
  }

  selectCheckbox() {
    cy.xpath(this.xpathForCheckBox()).click();
  }

  clickEnter() {
    cy.xpath(this.xpathForEnterButton()).click();
  }

  getError() {
    return cy.xpath(this.xpathForError());
  }

  xpathForDialog() {
    this.xpath = '//*[@id="age_content"]';
    return this.xpath;
  }

  xpathForEnterButton() {
    this.xpath = '//button[contains(.,"Enter")]';
    return this.xpath;
  }

  xpathForCheckBox() {
    this.xpath = '//input[@id="age_checkbox_remember_me"]';
    return this.xpath;
  }

  xpathForDay() {
    this.xpath = '//*[@id="age_select_day"]';
    return this.xpath;
  }

  xpathForMonth() {
    this.xpath = '//*[@id="age_select_month"]';
    return this.xpath;
  }

  xpathForYear() {
    this.xpath = '//*[@id="age_select_year"]';
    return this.xpath;
  }

  xpathForError() {
    this.xpath = '//*[@id="age_missing_message"]';
    return this.xpath;
  }

  xpathForLocation() {
    this.xpath = `${this.xpathForDialog()}//*[@id="age_select_country_group"]`;
    return this.xpath;
  }
}
export default DobDialog;
