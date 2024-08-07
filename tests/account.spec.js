// import { globalSetup } from "./fixtures/globalSetup"; // Adjust the import path as needed

import config from "../playwright.config";
import { users } from "../data/users.json";
// import { test, expect } from "@playwright/test";
import { test, expect } from "./fixtures/testObjects.js";
import CustomCookies from "../helpers/Cookies";

test.describe("template accountPage", () => {
  test.skip("test cookies", async ({ accountPage, page }) => {
    const customCookies = new CustomCookies(page.context());
    await customCookies.setB2b();
    await customCookies.closeCookieBanner();
    await page.goto("/");
    await customCookies.showAllCookies();
    await accountPage.elements.accountIcon().click();
    // await customCookies.showAllCookies();
  });
  test("navigates to accountPage-url when user click to the accountPage-icon", async ({
    accountPage,
    page,
  }) => {
    // const customCookies = new CustomCookies(page.context());
    const customCookies = CustomCookies.getInstance(page.context());
    await customCookies.setB2c();
    await customCookies.closeCookieBanner();
    // make all single actions and assertions in the testfile
    await page.goto("/");
    // negative test
    await expect(page.url()).not.toBe(
      config.use.baseURL + accountPage.urls.accountLogin
    );
    customCookies.showAllCookies();
    // click on the accountPage-icon
    await accountPage.actions.clickToIcon();
    // wait for the accountpage
    // use assertions and their helper (pre)functions only in the testfile
    await page.waitForURL(config.use.baseURL + accountPage.urls.accountLogin, {
      timeout: 5000,
    });
    // expect to be on the accountpage
    expect(page.url()).toBe(config.use.baseURL + accountPage.urls.accountLogin);
  });
  test("contains the accountPage-context when user is on the accountPage-page", async ({
    accountPage,
    page,
  }) => {
    const customCookies = new CustomCookies(page.context());
    await customCookies.setB2c();
    await customCookies.closeCookieBanner();
    // negative test
    await expect(accountPage.elements.pageContext()).not.toBeVisible();
    // visit the accountpage
    await page.goto(accountPage.urls.account);
    // locator exists and is visible on the page
    await expect(accountPage.elements.pageContext()).toBeVisible();
  });
  test("contains a loginmask when user is on the accountPage-page", async ({
    accountPage,
    page,
  }) => {
    const customCookies = new CustomCookies(page.context());
    await customCookies.setB2c();
    await customCookies.closeCookieBanner();
    // negative test
    await expect(accountPage.elements.formLoginMail()).not.toBeVisible();
    // visit the accountpage
    await page.goto(accountPage.urls.accountLogin);
    // locator exists and is visible on the page
    await expect(accountPage.elements.formLoginMail()).toBeVisible();
  });
  test("get an error msg when login with an unregistered user", async ({
    accountPage,
    page,
  }) => {
    const customCookies = new CustomCookies(page.context());
    await customCookies.setB2c();
    await customCookies.closeCookieBanner();
    // visit the accountpage
    await page.goto(accountPage.urls.accountLogin);

    // negative test
    await expect(accountPage.elements.stateErrorPassword()).not.toBeVisible();
    // fill the login form
    await accountPage.actions.insertUserData(users[0]);
    // submit the form
    // await accountPage.actions.clickLoginButton();
    // wait for the error message 2 seconds
    // expect the error message to be visible
    await expect(accountPage.elements.stateErrorPassword()).toBeVisible({
      timeout: 2000,
    });
  });
});
