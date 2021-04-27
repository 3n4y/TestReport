class CheckoutPage {
  xpathForContinueToDeliveryButton() {
    this.xpath = '//*[@id="continue_button"]';
    return this.xpath;
  }

  xpathForContinueShopping() {
    this.xpath = '//*[@class="continue_shopping_button"]';
    return this.xpath;
  }

  xpathForEmail() {
    this.xpath = '//*[@id="checkout_email"]';
    return this.xpath;
  }

  xpathForFirstName() {
    this.xpath = '//*[@id="checkout_shipping_address_first_name"]';
    return this.xpath;
  }

  xpathForLastName() {
    this.xpath = '//*[@id="checkout_shipping_address_last_name"]';
    return this.xpath;
  }

  xpathForCompany() {
    this.xpath = '//*[@id="checkout_shipping_address_company"]';
    return this.xpath;
  }

  xpathForAddressLine1() {
    this.xpath = '//*[@id="checkout_shipping_address_address1"]';
    return this.xpath;
  }

  xpathForAddressLine2() {
    this.xpath = '//*[@id="checkout_shipping_address_address2"]';
    return this.xpath;
  }

  xpathForCity() {
    this.xpath = '//*[@id="checkout_shipping_address_city"]';
    return this.xpath;
  }

  xpathForPostcode() {
    this.xpath = '//*[@id="checkout_shipping_address_zip"]';
    return this.xpath;
  }

  xpathForPhone() {
    this.xpath = '//*[@id="checkout_shipping_address_phone"]';
    return this.xpath;
  }
}
export default CheckoutPage;
