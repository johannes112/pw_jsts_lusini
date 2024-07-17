import config from "../playwright.config";
import { BrowserContext } from "@playwright/test";
import { getCurrentDate } from "./Functions";

export default class Cookies {
  private context: BrowserContext;

  constructor(contextCur) {
    console.log("-> Cookies");
    this.context = contextCur;
  }
  // values for cookies
  private cookies: {
    [key: string]: {
      name: string;
      value: string;
      url: string | undefined;
    };
  } = {
    b2b: {
      name: "channel",
      value: "de-de_b2b",
      url: config.use?.baseURL,
    },
    b2c: {
      name: "channel",
      value: "de-de_b2c",
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
    await this.context.addCookies([this.cookies.b2b]);
  }
  async setB2c() {
    console.log("-> setB2c");
    await this.context.addCookies([this.cookies.b2c]);
  }
  async closeCookieBanner() {
    console.log("-> setCookieBanner");
    await this.context.addCookies([this.cookies.cookieBanner]);
  }
}
