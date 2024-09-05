// import { globalSetup } from "./globalSetup";
import { test as base } from "@playwright/test";
import AccountPage from "../../pages/AccountPage";
import CustomCookies from "../../helpers/Cookies";

type TestObjects = {
  accountPage: AccountPage;
};

export const test = base.extend<TestObjects>({
  accountPage: async ({ page }, use) => {
    const customCookies = CustomCookies.getInstance(page.context());
    customCookies.setB2c();
    customCookies.closeCookieBanner();
    await use(new AccountPage(page));
  },
});

// test.beforeEach(async () => {
//   await globalSetup();
// });

export { expect } from "@playwright/test";
