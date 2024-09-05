import { baseUrl } from "/data/config/index";
import { countryConfig } from "/data/config/index";
import { BrowserContext } from "@playwright/test";
import { getCurrentDate } from "./Functions";

/** CustomCookies
 * description: Class to handle custom cookies
 * get data from: config/index.ts
 * args: contextCur: BrowserContext
 * - set b2c cookies
 * - set b2b cookies
 * - close cookie banner
 * - add new cookies
 * - show all cookies
 * actions: set Cookies, get Cookies, show all Cookies
 */
export default class CustomCookies {
  private static instance: CustomCookies;
  private context: BrowserContext;
  private existingCookies: any[] = [];

  private constructor(contextCur: BrowserContext) {
    console.log("> CustomCookies");
    this.context = contextCur;
  }

  // Static method to get the single instance of the class
  public static getInstance(contextCur: BrowserContext): CustomCookies {
    if (!CustomCookies.instance) {
      CustomCookies.instance = new CustomCookies(contextCur);
    }
    console.log(`>> CustomCookies.instance: ${CustomCookies.instance}`);
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
      name: countryConfig.cookies.b2b.name,
      value: countryConfig.cookies.b2b.value,
      url: baseUrl,
    },
    b2c: {
      name: countryConfig.cookies.b2c.name,
      value: countryConfig.cookies.b2c.value,
      url: baseUrl,
    },
    cookieBanner: {
      name: countryConfig.cookies.cookieBanner.name,
      value: getCurrentDate(),
      url: baseUrl,
    },
  };

  async setB2b() {
    console.log("-> setB2b");
    // (await !this.isCookieAlreadyExisting(this.customCookies.b2b)) &&
    await this.createCookie([this.customCookies.b2b]);
  }
  async setB2c() {
    console.log("-> setB2c");
    await this.createCookie([this.customCookies.b2c]);
  }
  async closeCookieBanner() {
    console.log("-> setCookieBanner");
    await this.createCookie([this.customCookies.cookieBanner]);
  }

  async createCookie(cookieContent) {
    console.log("-> createCookie");
    await this.context.addCookies(cookieContent);
  }

  async showAllExistingCookiesOfCurrentPage() {
    console.log("-> showAllExistingCookiesOfCurrentPage");
    const cookies = await this.context.cookies();
    if (cookies.length === 0) {
      console.log(">>> No cookies found");
      return;
    }
    cookies.forEach((cookie) => {
      console.log(`>> Name: ${cookie.name}, Value: ${cookie.value}`);
      this.setExistingCookies(cookie);
    });
  }

  async isCookieAlreadyExistingInMyVariables() {
    console.log("-> isCookieAlreadyExisting");
    await this.showAllExistingCookiesOfCurrentPage();
    const allExistingCookiesOfCurrentPage = await this.getExistingCookies();
    // loop through all existing cookies
    for (let i = 0; i < allExistingCookiesOfCurrentPage.length; i++) {
      console.log(
        `>> Cookie: ${allExistingCookiesOfCurrentPage[i].name}, Value: ${allExistingCookiesOfCurrentPage[i].value}`
      );
      if (
        // search for the name of the cookie in the object
        allExistingCookiesOfCurrentPage.find(
          (cookie) => cookie.value === Object.keys(this.customCookies)[i]
        )
      ) {
        console.log(">>> Cookie is already existing.");
        return true;
      } else {
        console.log(">>> Cookie is not existing.");
        return false;
      }
    }
  }
}
