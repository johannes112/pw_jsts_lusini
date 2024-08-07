import config from "../playwright.config";
import { BrowserContext } from "@playwright/test";
import { getCurrentDate } from "./Functions";

/** CustomCookies
 * description: Class to handle custom cookies
 * - add new cookies
 * - show all cookies
 * args: contextCur: BrowserContext
 * actions: setB2b, setB2c, closeCookieBanner, showAllCookies
 */
export default class CustomCookies {
  private static instance: CustomCookies;
  private context: BrowserContext;
  private existingCookies: any[] = [];

  private constructor(contextCur: BrowserContext) {
    console.log("-> CustomCookies");
    this.context = contextCur;
  }

  // Static method to get the single instance of the class
  public static getInstance(contextCur: BrowserContext): CustomCookies {
    if (!CustomCookies.instance) {
      CustomCookies.instance = new CustomCookies(contextCur);
    }
    return CustomCookies.instance;
  }

  // set existing cookies
  async setExistingCookies(cookie: any) {
    console.log("-> setExistingCookies");
    this.existingCookies.push(cookie);
  }
  // get existing cookies
  async getExistingCookies() {
    console.log("-> getExistingCookies");
    return this.existingCookies;
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
    // (await !this.isCookieAlreadyExisting(this.customCookies.b2b)) &&
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
    const cookies = await this.context.cookies();
    if (cookies.length === 0) {
      console.log(">>> No cookies found");
      return;
    }
    cookies.forEach((cookie) => {
      console.log(`Name: ${cookie.name}, Value: ${cookie.value}`);
      this.setExistingCookies(cookie);
    });
  }
}
