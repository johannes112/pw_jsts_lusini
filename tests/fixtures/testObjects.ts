import { chromium } from "playwright";
import { test as base } from "@playwright/test";
import AccountPage from "../../pages/AccountPage";
import CustomCookies from "../../helpers/Cookies";

type TestObjects = {
  accountPage: AccountPage;
  customCookies: CustomCookies;
};

let browser, page, context, customCookies;

// export const globalSetup = async () => {
//   browser = await chromium.launch();
//   context = await browser.newContext();
//   page = await context.newPage();
//   customCookies = new CustomCookies(context);
//   await customCookies.setB2c();
//   await customCookies.closeCookieBanner();
// };

export const test = base.extend<TestObjects>({
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
});

export { expect } from "@playwright/test";
