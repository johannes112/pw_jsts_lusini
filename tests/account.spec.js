// import config from "../playwright.config";
import { baseUrl } from "../data/config";
import { countryConfig } from "../data/config";
// import { test, expect } from "@playwright/test";
import { test, expect } from "./fixtures/testObjects.js";
import CustomCookies from "../helpers/Cookies";
import PointerClass from "../helpers/PointerClass";
import PageWrapper from "../helpers/PageWrapper";

const pointer = new PointerClass();
test.describe("template accountPage", () => {
  test.skip("test cookies", async ({ accountPage, page }) => {
    const customCookies = new CustomCookies(page.context());
    await customCookies.setB2b();
    // await customCookies.closeCookieBanner();
    await page.goto("/");
    // await customCookies.showAllExistingCookiesOfCurrentPage();
    await customCookies.isCookieAlreadyExistingInMyVariables();
  });
  test.describe("without user login", () => {
    test("navigates to accountPage-url when user click to the accountPage-icon", async ({
      accountPage,
      page,
    }) => {
      // make all single actions and assertions in the testfile
      await page.goto("/");
      // negative test
      await expect(page.url()).not.toBe(
        baseUrl + accountPage.urls.accountLogin
      );
      // click on the accountPage-icon
      await accountPage.actions.clickToIcon();
      // wait for the accountpage
      // use assertions and their helper (pre)functions only in the testfile
      await page.waitForURL(baseUrl + accountPage.urls.accountLogin, {
        timeout: 5000,
      });
      // expect to be on the accountpage
      expect(page.url()).toBe(baseUrl + accountPage.urls.accountLogin);
    });
    test("contains the accountPage-context when user is on the accountPage-page", async ({
      accountPage,
      page,
    }) => {
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
      // visit the accountpage
      await page.goto(accountPage.urls.accountLogin);
      // negative test
      await expect(accountPage.elements.stateErrorPassword()).not.toBeVisible();
      // fill the login form
      await accountPage.actions.insertUserData(countryConfig.testdata.user);
      await accountPage.actions.clickLoginButton();
      // expect the error message to be visible
      await expect(accountPage.elements.stateErrorPassword()).toBeVisible({
        timeout: 2000,
      });
    });
  });
  test.describe("with user login", () => {
    test.only("register an user account", async ({ accountPage, page }) => {
      const wrappedPage = new PageWrapper(page, pointer);
      pointer.addFunctionCall("*** Test wrapped page");
      // visit the accountpage
      // await page.goto(accountPage.urls.accountLogin);
      await wrappedPage.goto(accountPage.urls.accountLogin);
      // epect to be on the accountLogin page
      // await wrappedPage.expectUrlPart(accountPage.urls.accountLogin);
      // negative test
      // await expect(accountPage.elements.stateErrorPassword()).not.toBeVisible();
      await wrappedPage.expectStateErrorPasswordNotVisible(2000);
      // fill the login form
      // await accountPage.actions.insertUserData(countryConfig.testdata.user);
      await wrappedPage.insertUserData(countryConfig.testdata.user);
      // await accountPage.actions.clickLoginButton();
      await wrappedPage.clickLoginButton();
      // expect the url has changed
      await wrappedPage.expectUrlPart(accountPage.urls.accountLogin, false);
      // expect the new url: account
      await wrappedPage.expectUrl(accountPage.urls.account);
      // expect the error message to be visible
      // await wrappedPage.expectUrlPart(accountPage.urls.accountRegister, false);
      // console.log("*Pointer: Function calls: ", pointer.getPreviousFunctionCall());
      // await expect(accountPage.elements.stateErrorPassword()).toBeVisible({
      //   timeout: 2000,
      // });
      // await wrappedPage.expectStateErrorPasswordVisible(2000);
    });
  });
});
