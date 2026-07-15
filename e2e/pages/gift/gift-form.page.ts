import { Page } from "@playwright/test";

export class GiftFormPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/gift");
  }

  async start() {
    await this.page.getByTestId("gift-start-button").click();
  }

  async selectSpaceBlanket() {
    await this.page.getByTestId("gift-option-space_blanket").click();
  }

  async selectGiftCard() {
    await this.page.getByTestId("gift-option-gift_card").click();
  }

  async continueFromGiftDetail() {
    await this.page.getByTestId("gift-detail-continue").click();
  }

  async continueFromGiftCardDetail() {
    await this.page.getByTestId("gift-detail-gift-card-continue").click();
  }

  async selectGiftCardLocation(
    location: "ukraine" | "poland" | "europe" | "canada" | "usa" | "other"
  ) {
    await this.page.getByTestId(`gift-card-location-${location}`).click();
  }

  async selectGiftCardService(serviceId: string) {
    await this.page.getByTestId(`gift-card-service-${serviceId}`).click();
  }

  async selectDonation() {
    await this.page.getByTestId("gift-option-donation").click();
  }

  async submitDonation(charityLink: string = "") {
    if (charityLink) {
      await this.page.getByTestId("gift-donation-charity-link").fill(charityLink);
    }
    await this.page.getByTestId("gift-donation-continue").click();
  }

  async selectMerch() {
    await this.page.getByTestId("gift-option-merch").click();
  }

  async continueFromMerchDetail() {
    await this.page.getByTestId("gift-detail-merch-continue").click();
  }

  async selectDeliveryMethod(method: "home" | "hub") {
    await this.page.getByTestId(`gift-delivery-method-${method}`).click();
  }

  async selectPickupCity(city: "lviv" | "kyiv" | "wroclaw") {
    await this.page.getByTestId(`gift-pickup-city-${city}`).click();
  }

  async fillPersonalInfo(data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }) {
    await this.page.getByTestId("gift-personal-info-first-name").fill(data.firstName);
    await this.page.getByTestId("gift-personal-info-last-name").fill(data.lastName);
    await this.page.getByTestId("gift-personal-info-phone").fill(data.phone);
    await this.page.getByTestId("gift-personal-info-email").fill(data.email);
    await this.page.getByTestId("gift-personal-info-continue").click();
  }

  async fillContactInfo(data: {
    addressLine1: string;
    city: string;
    postalCode: string;
    country: string;
  }) {
    await this.page.getByTestId("gift-contact-info-addressLine1").fill(data.addressLine1);
    await this.page.getByTestId("gift-contact-info-city").fill(data.city);
    await this.page.getByTestId("gift-contact-info-postalCode").fill(data.postalCode);
    await this.page.getByTestId("gift-contact-info-country").fill(data.country);
    await this.page.getByTestId("gift-contact-info-continue").click();
  }

  async fillPostOfficeAddress(address: string) {
    await this.page.getByTestId("gift-post-office-address").fill(address);
    await this.page.getByTestId("gift-post-office-continue").click();
  }

  async submit() {
    await this.page.getByTestId("gift-submit-button").click();
  }
}
