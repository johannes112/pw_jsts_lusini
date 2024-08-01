import { globalSetup } from "./globalSetup";
import { test as base } from "@playwright/test";
import AccountPage from "../../pages/AccountPage";
import CustomCookies from "../../helpers/Cookies";

type TestObjects = {
  accountPage: AccountPage;
  customCookies: CustomCookies;
};

export const test = base.extend<TestObjects>({
  accountPage: async ({ page }, use) => {
    // globalSetup();
    await use(new AccountPage(page));
  },
});

// test.beforeEach(async () => {
//   await globalSetup();
// });

export { expect } from "@playwright/test";
