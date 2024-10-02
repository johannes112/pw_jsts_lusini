import { Page } from "playwright";
import PointerClass from "./PointerClass";
import accountPage from "../pages/AccountPage";
import { expect } from "@playwright/test";
import { get } from "http";

class PageWrapper extends accountPage {
  //   private page: Page;
  private pointer: PointerClass;
  private accountPage: accountPage;

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
    if (not === false) {
      // add an timeout until the new url appears
      await this.page.waitForFunction(
        (expectedURL) => window.location.href !== expectedURL,
        url,
        { timeout: 5000 }
      );
      return;
    }

    console.log(
      `+-PrevFunc: ${prevFunc.functionName}, ${prevFunc.functionArguments}, ${prevFunc.url}`
    );
    // check if the url is equal to a specific url
    await expect(this.page.url()).toBe(`${domainUrl}${url}`);
  }
}

export default PageWrapper;
