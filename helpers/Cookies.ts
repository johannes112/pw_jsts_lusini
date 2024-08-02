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
  private context: BrowserContext;
  private existingCookies: any[] = [];

  constructor(contextCur: BrowserContext) {
    console.log("-> CustomCookies");
    this.context = contextCur;
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
    (await !this.isCookieAlreadyExisting(this.customCookies.b2b)) &&
      (await this.context.addCookies([this.customCookies.b2b]));
  }
  async setB2c() {
    console.log("-> setB2c");
    await this.context.addCookies([this.customCookies.b2c]);
  }
  async closeCookieBanner() {
    console.log("-> setCookieBanner");
    await this.context.addCookies([this.customCookies.cookieBanner]);
  }

  // check if cookie already exists in getExistingCookies
  async isCookieAlreadyExisting(cookie: any) {
    console.log("-> checkCookieExists");
    const existingCookies = await this.getExistingCookies();
    const cookieExists = existingCookies.find(
      (existingCookie) => existingCookie.name === cookie.name
    );
    return true;
  }

  async showAllCookies() {
    console.log("-> showAllCookies");
    const cookies = await this.context.cookies();
    cookies.forEach((cookie) => {
      console.log(`Name: ${cookie.name}, Value: ${cookie.value}`);
      this.setExistingCookies(cookie);
    });
  }
}
