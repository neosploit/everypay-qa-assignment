import { expect, FrameLocator, Locator, Page } from "@playwright/test";

export class PayForm {
  // Page
  readonly page: Page;

  // Iframe
  readonly iframe: FrameLocator;

  // Locators
  readonly inputCardNumber: Locator;
  readonly inputExpiryDate: Locator;
  readonly inputCVV: Locator;
  readonly inputCardHolderName: Locator;
  readonly btnPay: Locator;
  readonly containerErrorMessage: Locator;
  readonly textCtnHash: Locator;

  constructor(page: Page) {
    this.page = page;

    // Iframe
    this.iframe = page.frameLocator("#payForm");

    // Locators
    this.inputCardNumber = this.iframe.locator("#cardNumber");
    this.inputExpiryDate = this.iframe.locator("#expiryDate");
    this.inputCVV = this.iframe.locator("#cvv");
    this.inputCardHolderName = this.iframe.locator("#name");

    this.btnPay = this.iframe.locator('button[type="submit"]');
    this.containerErrorMessage = this.iframe.locator("form + div");

    this.textCtnHash = page.locator("p");
  }

  async fillCardDetails(card: Card) {
    await this.inputCardNumber.fill(card.cardNumber);
    await this.inputExpiryDate.fill(card.expiryDate);
    await this.inputCVV.fill(card.cvv);
    await this.inputCardHolderName.fill(card.cardholderName);
  }

  async completePayment() {
    await this.btnPay.click();
  }

  async expectErrorMessage(text: string) {
    await expect(this.containerErrorMessage).toHaveText(text);
  }

  async verifyCtnHashExists() {
    await expect(this.textCtnHash).toHaveText(/^ctn_.*/);
  }
}
