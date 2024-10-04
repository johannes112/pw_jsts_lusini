import { Page } from "playwright";
import PointerClass from "./PointerClass";
import accountPage from "../pages/AccountPage";
import { expect } from "@playwright/test";

/**
 * @class PageWrapper
 * @description Wrapper class for the page
 * @purpose: Add additional functionality to the page
 * @argument page (Page) - the page to wrap
 * @argument pointer (PointerClass) - the pointer to store the function calls
 * @action: Add additional functionality to the page
 */
class PageWrapper extends accountPage {
  //   private page: Page;
  private pointer: PointerClass;
  private accountPage: accountPage;
  private counter: number = 0; // Initialize the counter

  constructor(page: Page, pointer: PointerClass) {
    super(page); // Call the super constructor with the 'page' argument
    // this.page = page;
    this.pointer = pointer;
    this.accountPage = new accountPage(this.page);
  }

  async goto(url: string) {
    const functionName = this.goto.name;
    const functionArguments = { url };
    this.pointer.addFunctionCall(
      functionName,
      JSON.stringify(functionArguments)
    );
    return this.page.goto(url);
  }

  async click(selector: string) {
    const functionName = this.click.name;
    const functionArguments = { selector };
    this.pointer.addFunctionCall(
      functionName,
      JSON.stringify(functionArguments)
    );
    return this.page.click(selector);
  }

  async insertUserData(userData: any) {
    const functionName = this.insertUserData.name;
    const functionArguments = userData;
    const currentUrl = this.page.url();
    this.pointer.addFunctionCall(
      functionName,
      JSON.stringify(functionArguments),
      JSON.stringify(currentUrl)
    );
    return this.accountPage.actions.insertUserData(userData);
  }
  async clickLoginButton() {
    const functionName = this.clickLoginButton.name;
    const functionArguments = {};
    this.pointer.addFunctionCall(
      functionName,
      JSON.stringify(functionArguments)
    );
    return this.accountPage.actions.clickLoginButton();
  }
  async expectStateErrorPasswordNotVisible(timeout: number = 2000) {
    const functionName = this.expectStateErrorPasswordNotVisible.name;
    const functionArguments = { timeout };
    this.pointer.addFunctionCall(
      functionName,
      JSON.stringify(functionArguments)
    );
    await expect(
      this.accountPage.elements.stateErrorPassword()
    ).not.toBeVisible({
      timeout,
    });
  }
  async expectStateErrorPasswordVisible(timeout: number = 2000) {
    let retry = 0;
    const functionName = this.expectStateErrorPasswordVisible.name;
    const currentUrl = this.page.url();
    this.pointer.addFunctionCall(
      `expectStateErrorPasswordVisible: timeout ${timeout}`
    );
    await expect(this.accountPage.elements.stateErrorPassword()).toBeVisible({
      timeout,
    });
  }

  // check if the url contains a specific part
  async expectUrlPart(url: string, not?: boolean) {
    const functionName = this.expectUrlPart.name;
    const functionArguments = { url, not };
    this.pointer.addFunctionCall(
      functionName,
      JSON.stringify(functionArguments)
    );
    // if not is given as a parameter(in this case as the boolean false)
    if (not === false) {
      // add an timeout until the new url appears
      await this.page.waitForFunction(
        (urlPart) => !window.location.href.includes(urlPart),
        url,
        { timeout: 5000 }
      );
      return;
    } else {
      await expect(this.page.url()).toContain(url);
    }
  }
  // check if the url is equal to a specific url
  async expectUrl(url: string, not?: boolean) {
    const functionName = this.expectUrl.name;
    const functionArguments = { url, not };
    this.pointer.addFunctionCall(
      functionName,
      JSON.stringify(functionArguments)
    );
    // get the previous function call from the pointer idenityfied by the function name
    const prevFunc = this.pointer.getPreviousFunctionCall("insert");
    // const prevFunc = this.pointer.getPreviousFunctionCall(5);
    // get domain-url from the page
    const domainUrl = this.accountPage.urls.lusini;
    try {
      if (not === false) {
        // add an timeout until the new url appears
        await this.page.waitForFunction(
          (expectedURL) => window.location.href !== expectedURL,
          url,
          { timeout: 5000 }
        );
        return;
      }

      // check if the url is equal to a specific url
      await expect(this.page.url()).toBe(`${domainUrl}${url}`);
    } catch (e) {
      console.log("+- expectUrl: ", e);
      await this.retryFunction();
      await this.clickLoginButton();
      await expect(this.page.url()).toBe(`${domainUrl}${url}`);
    }
  }

  // retry executing the function of this class which is given by this.pointer.getPreviousFunctionCall("insert")
  async retryFunction() {
    // get the previous function call from the pointer identified by the function name
    const prevFunc = this.pointer.getPreviousFunctionCall("insert");
    console.log("+- retryFunction: ", prevFunc);

    // Modify the functionArguments of the previous function call by manipulating the functionArguments
    const modifiedArgs = await this.manipulateFunctionArguments(
      prevFunc.functionArguments
    );
    console.log("+-- retryFunction: ", modifiedArgs);

    // Log the URL to debug
    console.log("+- retryFunction: original URL: ", prevFunc.url);

    // Ensure the URL is properly formatted
    const formattedUrl = prevFunc.url.trim().replace(/^"|"$/g, "");
    console.log("+- retryFunction: formatted URL: ", formattedUrl);

    // Check if the current URL is equal to the URL from the previous function call
    if (this.page.url() === formattedUrl) {
      console.log(
        "+- retryFunction: ",
        `${[prevFunc.functionName]}${JSON.parse(prevFunc.functionArguments)}`
      );
      await this[prevFunc.functionName](JSON.parse(prevFunc.functionArguments));
    }
    // Else go to the URL of the previous function call
    else {
      console.log("+- retryFunction: goto ", formattedUrl);
      await this.page.goto(formattedUrl);
      // Log the current URL of the page
      console.log("++ current URL: ", this.page.url());
      await this[prevFunc.functionName](JSON.parse(modifiedArgs));
    }
  }

  // manipulate the functionArguments of the given args
  async manipulateFunctionArguments(args: any) {
    console.log("+-- manipulateFunctionArguments: ", args);

    // Parse the args as a JSON object
    let parsedArgs = JSON.parse(args);

    // Iterate over the key-value pairs and prepend a random number to each value
    for (let key in parsedArgs) {
      if (parsedArgs.hasOwnProperty(key)) {
        // Generate a random number
        const randomNumber = Math.floor(Math.random() * 1000); // Adjust the range as needed
        // Add the random number to the front of the string
        parsedArgs[key] = `${randomNumber}${parsedArgs[key]}`;
      }
    }

    // Convert the modified arguments back to a JSON string
    let newArgs = JSON.stringify(parsedArgs);
    console.log("+-- manipulateFunctionArguments: ", newArgs);
    return newArgs;
  }
}

export default PageWrapper;
