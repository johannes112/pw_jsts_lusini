// Do not use assertions in the page object. Instead, use assertions in the test file.
import { PageObject } from "./PageObject";
import config from "../playwright.config";
import { Locator, Page } from "@playwright/test";
import CustomCookies from "../helpers/Cookies";
import { secureClick } from "../helpers/Functions";

export default class Account implements PageObject {
  private errorMessage: string;
  private page: Page;
  private customCookies: CustomCookies;
  private pageContext: Locator;
  private formLoginMail: Locator;
  private accountIcon: Locator;
  private fieldEmailInput: Locator;
  private fieldPasswordInput: Locator;
  private buttonLogin: Locator;
  private stateErrorPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customCookies = new CustomCookies(this.page.context());
    this.initialize();
  }

  // static method to create instance of Account class
  // a: Because we can create an instance of the class without creating an object
  static new(page: Page): Account {
    return new Account(page);
  }

  public async initialize(): Promise<void> {
    // Function to be executed first
    console.log("-> handle Account");
    this.pageContext = this.elements.pageContext();
    this.formLoginMail = this.elements.formLoginMail();
    this.accountIcon = this.elements.accountIcon();
    this.fieldEmailInput = this.elements.fieldEmailInput();
    this.fieldPasswordInput = this.elements.fieldPasswordInput();
    this.buttonLogin = this.elements.buttonLogin();
    this.stateErrorPassword = this.elements.stateErrorPassword();
  }

  // setter for errorMessage
  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }
  // getter for errorMessage
  getErrorMessage(): string {
    return this.errorMessage;
  }

  /** cssPathes: CSS-Selectors */
  cssPathes = {
    pageContext: '[data-cy-ctx="molecules/account/AccountLoginForm"]',
    formLoginMail: ".login-mail",
    accountIcon: ".account",
    fieldEmailInput: '[data-cy-handle="email-input"]',
    fieldPasswordInput: '[data-cy-handle="password-input"]',
    buttonLogin: '[data-cy-handle="login-btn"]',
    stateErrorPassword: '[data-cy-state="login-form-password-error"]',
  };

  /** elements: Elements (get by selectors) */
  elements = {
    pageContext: () => this.page.locator(this.cssPathes.pageContext),
    formLoginMail: () => this.page.locator(this.cssPathes.formLoginMail),
    accountIcon: () => this.page.locator(this.cssPathes.accountIcon),
    fieldEmailInput: () => this.page.locator(this.cssPathes.fieldEmailInput),
    fieldPasswordInput: () =>
      this.page.locator(this.cssPathes.fieldPasswordInput),
    buttonLogin: () => this.page.locator(this.cssPathes.buttonLogin),
    stateErrorPassword: () =>
      this.page.locator(this.cssPathes.stateErrorPassword),
  };

  /** actions: Multisteps (related) */
  actions = {
    insertUserData: async (user) => {
      console.log("-> fillLoginForm");
      await this.page.fill(this.cssPathes.fieldEmailInput, user.email);
      await this.page.fill(this.cssPathes.fieldPasswordInput, user.password);
      // await secureClick(this.page, this.cssPathes.buttonLogin);
      // await this.elements.buttonLogin().click();
      this.actions.clickLoginButton();
    },
    clickIcon: async () => {
      console.log("-> clickIcon");
      // await GlobalFunctions.secureClick(this.cssPathes.accountIcon);
      await this.elements.accountIcon().click();
    },
    clickLoginButton: async () => {
      console.log("-> clickLogin");
      // await GlobalFunctions.secureClick(this.cssPathes.buttonLogin);
      await this.elements.buttonLogin().click();
    },
    waitForLoginUrl: async () => {
      console.log("-> waitForLoginUrl");
      if (config.use?.baseURL == undefined) {
        console.log(">> BaseURL is not defined in config.");
      }
      await this.page.waitForURL(config.use?.baseURL + this.urls.accountLogin, {
        // Ensure consistent variable name
        timeout: 2000,
      });
    },
    clickToIcon: async () => {
      console.log("-> clickToIcon");
      await secureClick(this.page, this.cssPathes.accountIcon);
    },
  };

  /** urls: relative http-pathes */
  urls = {
    lusini: config.use?.baseURL,
    account: "account/",
    accountLogin: "account/login/",
  };
}
