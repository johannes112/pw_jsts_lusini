import CustomCookies from "./Cookies";
import { countryConfig } from "../data/config";
import { expect } from "@playwright/test";
// get current date -> for cookie
export function getCurrentDate(): string {
  const date = new Date();
  const isoDate: string = date.toISOString();
  return isoDate;
}

// set a cookie and retry it
export async function secureClick(
  page: any,
  selector: string,
  options = { retry: 3 }
): Promise<boolean> {
  let attempts = 0;
  // let customCookies = new CustomCookies(page.context());
  const customCookies = CustomCookies.getInstance(page.context());
  while (attempts < options.retry) {
    // Set cookies to close the cookie banner and refresh the page
    // const customCookies = new CustomCookies(context);
    try {
      console.log("> secureClick");
      console.log("page: ", page);
      console.log(`Attempt to click on ${selector}, try #${attempts + 1}`);
      const element = await page.locator(selector);
      console.log(">> Got the element: ", element);
      // Click the element
      await element.click({ timeout: 1000 }); //{ timeout: 2000 }
      console.log(`>> Clicked on ${selector} successfully.`);
      return true;
    } catch (error) {
      await customCookies.setB2c();
      await customCookies.closeCookieBanner();
      console.warn(`>>> Error clicking on ${selector}:`, error.message);
      if (attempts >= 0) {
        await page.reload();
      }
      // Increment the attempt counter
      attempts++; // Optionally, wait a bit before retrying (e.g., 500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  console.error(
    `Failed to click on ${selector} after ${options.retry} attempts.`
  );
  return false; // Click failed after retrying
}

export async function secureRegisterWithData(
  page: any,
  buttonSelector: string,
  mailSelector: string, // mailSelector: string,
  passwordSelector: string,
  user: any,
  options = { retry: 3 }
): Promise<boolean> {
  console.log("> secureRegisterWithData");
  let attempts = 0;
  while (attempts < options.retry) {
    // Set cookies to close the cookie banner and refresh the page
    const customCookies = CustomCookies.getInstance(page.context());
    // const customCookies = new CustomCookies(context);
    try {
      console.log("> buttonSelector: ", buttonSelector);
      console.log("> mailSelector: ", mailSelector);
      console.log("> passwordSelector: ", passwordSelector);
      console.log("> user: ", user);
      console.log("> user: ", user.email);
      console.log("> user: ", user.password);

      console.log(
        `Attempt to click on ${buttonSelector}, try #${attempts + 1}`
      );
      // get button
      const elementButton = await page.locator(buttonSelector);
      console.log(">> Got the element: ", elementButton);
      // fill the login form
      await page.fill(mailSelector, user.email);
      await page.fill(passwordSelector, user.password);
      elementButton.click();
      console.log(`>> Clicked on ${buttonSelector} successfully.`);
      await customCookies.setB2c();
      await customCookies.closeCookieBanner();
      return true;
    } catch (error) {
      let errorText = await page.locator(".error > div > span");
      console.log(">> errorText: ", errorText);
      console.warn(`>>> Error clicking on ${buttonSelector}:`, error.message);

      if (attempts >= 0) {
        await page.reload();
      }
      // Increment the attempt counter
      attempts++; // Optionally, wait a bit before retrying (e.g., 500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  console.error(
    `Failed to click on ${buttonSelector} after ${options.retry} attempts.`
  );
  return false; // Click failed after retrying
}

// Define the wrapper function
export async function expectWithAnalysis(element, options) {
  /*
1. erroridentification: make a wrapper arround the expectations which looks for an error (class) if the expectation is not met. so we can see what is wrong
2. list of functions: make a Pointerclass that stores every function in a list. So there would be a ordered list of functions that are called. 
   if an error occurs, the list can show which functions have been called before the error occurs.
3. if we know the trigger of the error, we can retry the function with other parameters.
*/
  // Perform the original expectation
  await expect(element).toBeVisible(options);

  // Add additional logic or assertions here
  // For example, log the element's text content
  const textContent = await element.textContent();
  console.log(`Element text content: ${textContent}`);

  // You can add more custom logic as needed
}
