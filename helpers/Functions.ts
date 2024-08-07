import CustomCookies from "./Cookies";

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
