import { Config } from "../../config.type";
const config: Config = {
  use: {
    baseURL: "https://www.lusini.com/",
    browser: "chromium",
  },
  cookies: {
    b2b: {
      name: "de-channel",
      value: "b2b",
      url: "https://www.lusini.com/",
    },
    b2c: {
      name: "de-channel",
      value: "b2c",
      url: "https://www.lusini.com/",
    },
    cookieBanner: {
      name: "OptanonAlertBoxClosed",
      value: "2021-10-21T15:09:00",
      url: "https://www.lusini.com/",
    },
  },
};
c;
