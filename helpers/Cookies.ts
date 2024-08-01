import config from "../playwright.config";
import { BrowserContext, Page } from "@playwright/test";
import { getCurrentDate } from "./Functions";

export default class CustomCookies {
  private context: BrowserContext;

  constructor(contextCur: BrowserContext) {
    console.log("-> CustomCookies");
    console.log(contextCur);
    this.context = contextCur;
  }
  // values for customCookies
  private customCookies: {
    [key: string]: {
      name: string;
      value: string;
      url: string | undefined;
    };
  } = {
    b2b: {
      name: "de-channel",
      value: "b2b",
      url: config.use?.baseURL,
    },
    b2c: {
      name: "de-channel",
      value: "b2c",
      url: config.use?.baseURL,
    },
    cookieBanner: {
      name: "OptanonAlertBoxClosed",
      value: getCurrentDate(),
      url: config.use?.baseURL,
    },
  };

  async setB2b() {
    console.log("-> setB2b");
    await this.context.addCookies([this.customCookies.b2b]);
  }
  async setB2c() {
    console.log("-> setB2c");
    await this.context.addCookies([this.customCookies.b2c]);
  }
  async closeCookieBanner() {
    console.log("-> setCookieBanner");
    await this.context.addCookies([this.customCookies.cookieBanner]);
  }

  async showAllCookies() {
    console.log("-> showAllCookies");
    console.log(await this.context.cookies());
  }
}
