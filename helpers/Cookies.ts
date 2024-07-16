import config from "../playwright.config";
import GlobalFunctions from "./Functions";

export default class Cookies {
  // Access the baseURL from the configuration

  static setCookies(context) {
    console.log("-> setCookies");
    const cookies = {
      b2b: {
        name: "channel",
        value: "de-de_b2b",
        url: config.use?.baseURL,
      },
      b2c: {
        name: "channel",
        value: "de-de_b2c",
        url: config.use?.baseURL,
      },
      cookieBanner: {
        name: "OptanonAlertBoxClosed",
        value: GlobalFunctions.getCurrentDate(),
        url: config.use?.baseURL,
      },
    };

    return {
      setB2b: async () => await context.addCookies([cookies.b2b]),
      setB2c: async () => await context.addCookies([cookies.b2c]),
      closeCookieBanner: async () =>
        await context.addCookies([cookies.cookieBanner]),
    };
  }
}
