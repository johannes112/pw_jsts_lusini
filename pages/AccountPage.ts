import { PageObject } from "./PageObject";
import config from "../playwright.config";
import { Locator, Page, BrowserContext } from "@playwright/test";
import { secureClick } from "../helpers/Functions";

export default class Account implements PageObject {
  private page: Page;
  private pageContext: Locator;
  private formLoginMail: Locator;
  private accountIcon: Locator;
  private fieldEmailInput: Locator;
  private fieldPasswordInput: Locator;
  private buttonLogin: Locator;
  private stateErrorPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.initialize();
  }

  // Add the following method to match the interface signature
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
    loginAsUser: async (user) => {
      console.log("-> fillLoginForm");
      await this.page.fill(this.cssPathes.fieldEmailInput, user.email);
      await this.page.fill(this.cssPathes.fieldPasswordInput, user.password);
      // await secureClick(this.page, this.cssPathes.buttonLogin);
      await this.elements.buttonLogin().click();
    },
    clickIcon: async () => {
      console.log("-> clickIcon");
      // await GlobalFunctions.secureClick(this.cssPathes.accountIcon);
      await this.elements.accountIcon().click();
    },
    clickLogin: async () => {
      console.log("-> clickLogin");
      // await GlobalFunctions.secureClick(this.cssPathes.buttonLogin);
      await this.elements.buttonLogin().click();
    },
  };

  /** assertions: Single steps */
  assertions = {
    assertLoginFormVisible: async () => {
      console.log("-> assertLoginFormVisible");
      await this.elements.formLoginMail().isVisible();
    },
    assertErrorPasswordVisible: async () => {
      console.log("-> assertErrorPasswordVisible");
      await this.elements.stateErrorPassword().isVisible();
    },
  };

  /** urls: relative http-pathes */
  urls = {
    lusini: config.use?.baseURL,
    account: "account/",
    accountLogin: "account/login/",
  };
}
