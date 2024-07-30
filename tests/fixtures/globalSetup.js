import { chromium } from "playwright";
import CustomCookies from "../../helpers/Cookies"; // Adjust the import path as needed

let browser, page, context;
/** globalSetup
 * use this always to have the same setup for all tests
 * - launch browser
 * - create a new context
 * - create a new page
 * - set cookies (B2C)
 * - close cookie banner
 */
async function globalSetup() {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  // Set Cookies
  const customCookies = new CustomCookies(page);
  await customCookies.setB2c();
  await customCookies.closeCookieBanner();
}

/** globalTeardowm
 * - show all cookies
 * - close browser
 * Don't use to this to avoid flaky tests
 */
async function globalTeardown() {
  // Get all cookies
  const cookies = await context.cookies();
  console.log("AllCookies after afterAll:", cookies);
  await browser.close();
}

export { browser, page, context, globalSetup };
