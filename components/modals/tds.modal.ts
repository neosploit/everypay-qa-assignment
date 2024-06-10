import { FrameLocator, Locator, Page } from "@playwright/test";

export class TDSModal {
  // Page
  readonly page: Page;

  // Iframe
  readonly iframe: FrameLocator;

  // Locators
  readonly btnSuccessfulAuthentication: Locator;
  readonly btnFailAuthentication: Locator;

  constructor(page: Page) {
    this.page = page;

    // Iframe
    this.iframe = page.frameLocator('iframe[name="tdsIframe"]');

    // Locators
    this.btnSuccessfulAuthentication = this.iframe
      .locator("#success-form")
      .locator('button[type="submit"]');
    this.btnFailAuthentication = this.iframe
      .locator("#fail-form")
      .locator('button[type="submit"]');
  }

  async triggerSuccessfulAuthentication() {
    await this.btnSuccessfulAuthentication.click();
  }

  async triggerFailedAuthentication() {
    await this.btnFailAuthentication.click();
  }
}
