import { Config } from "/data/config/config.type";
// default baseUrl
// it can be overwritten by setBaseUrl
export let baseUrl = "https://dev.lusini.com:8000/";

// it can be used to overwrite the default baseUrl
// it is currently not used
export function setBaseUrl(url: string) {
  baseUrl = url;
}

export const countryConfig: Config = {
  use: {
    baseURL: baseUrl,
    browser: "chromium",
  },
  cookies: {
    b2b: {
      name: "de-channel",
      value: "b2b",
      url: baseUrl,
    },
    b2c: {
      name: "de-channel",
      value: "b2c",
      url: baseUrl,
    },
    cookieBanner: {
      name: "OptanonAlertBoxClosed",
      value: "2021-10-21T15:09:00",
      url: baseUrl,
    },
  },
};
