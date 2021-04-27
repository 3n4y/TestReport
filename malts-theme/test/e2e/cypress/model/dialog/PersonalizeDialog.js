class PersonalizeDialog {
  constructor() {
    cy.xpath(this.xpathForDialog()).should('be.visible');
  }

  selectOption(option) {
    cy.xpath(this.xpathForChooseYourMessageDropDown()).select(`${option}`);
    cy.log(`Option selected is ${option}`);
  }

  clickMessageContainer() {
    cy.xpath(this.xpathForMessageContainer()).click();
    return this;
  }

  clickConfirmCheckBox() {
    cy.xpath(this.xpathForConfirmCheckbox()).should('be.visible').check();
    return this;
  }

  clickSaveMessage() {
    cy.xpath(this.xpathForSaveMessageButton()).click();
  }

  clickSaveInitials() {
    cy.xpath(this.xpathForSaveInitialsButton()).click();
  }

  clickInitialsContainer() {
    cy.xpath(this.xpathForInitialsContainer()).click();
    return this;
  }

  enterInitials1(letter) {
    cy.xpath(this.xpathForInitial1Input()).type(letter);
    return this;
  }

  enterInitials2(letter) {
    cy.xpath(this.xpathForInitial2Input()).type(letter);
    return this;
  }

  enterInitials3(letter) {
    cy.xpath(this.xpathForInitial3Input()).type(letter);
    return this;
  }

  clickUseInitials() {
    cy.xpath(this.xpathForUseInitialRadioButton()).check();
    return this;
  }

  clickUseHeart() {
    cy.xpath(this.xpathForUseHeartRadioButton()).check();
    return this;
  }

  checkAddHeartIcon() {
    cy.xpath(this.xpathForAddHeartIcon()).should('be.visible').check();
    return this;
  }

  xpathForDialog() {
    this.xpath = '//*[@class="modal-content"]';
    return this.xpath;
  }

  xpathForCloseButton() {
    this.xpath = `${this.xpathForDialog()}//*[contains(@class,"Close")]`;
    return this.xpath;
  }

  xpathForInitialsContainer() {
    this.xpath = `(${this.xpathForDialog()}//*[contains(@class,"engraving-promotion-component-module--engravingOption")])[1]`;
    return this.xpath;
  }

  xpathForMessageContainer() {
    this.xpath = `(${this.xpathForDialog()}//*[contains(@class,"engraving-promotion-component-module--engravingOption")])[2]`;
    return this.xpath;
  }

  xpathForSaveMessageButton() {
    this.xpath = `${this.xpathForDialog()}//button[text() = "Save Message"]`;
    return this.xpath;
  }

  xpathForSaveInitialsButton() {
    this.xpath = `${this.xpathForDialog()}//button[text() = "Save Initials"]`;
    return this.xpath;
  }

  xpathForInitial1Input() {
    this.xpath = `${this.xpathForInitialsContainer()}//*[@id="Initial_1"]`;
    return this.xpath;
  }

  xpathForInitial2Input() {
    this.xpath = `${this.xpathForInitialsContainer()}//*[@id="Initial_2"]`;
    return this.xpath;
  }

  xpathForInitial3Input() {
    this.xpath = `${this.xpathForInitialsContainer()}//*[@id="Initial_3"]`;
    return this.xpath;
  }

  xpathForUseInitialRadioButton() {
    this.xpath = `${this.xpathForInitialsContainer()}//*[@id="useInitial"]`;
    return this.xpath;
  }

  xpathForUseHeartRadioButton() {
    this.xpath = `${this.xpathForInitialsContainer()}//*[@id="useHeart"]`;
    return this.xpath;
  }

  xpathForAddHeartIcon() {
    this.xpath = `${this.xpathForMessageContainer()}//*[@id="addHeartToMessage"]`;
    return this.xpath;
  }

  xpathForChooseYourMessageDropDown() {
    this.xpath = `${this.xpathForMessageContainer()}//*[@id="presetMessage"]`;
    return this.xpath;
  }

  xpathForChooseYourMessageDropDownOptions() {
    this.xpath = `${this.xpathForMessageContainer()}//*[@id="presetMessage"]//option[not(contains(.,"Choose your message"))]`;
    return this.xpath;
  }

  xpathForConfirmCheckbox() {
    this.xpath = `${this.xpathForDialog()}//*[@id="confirmation"]`;
    return this.xpath;
  }
}
export default PersonalizeDialog;
