export type Config = {
  use: {
    baseURL: string;
    browser: string;
  };
  cookies: {
    b2b: {
      name: string;
      value: string;
      url: string;
    };
    b2c: {
      name: string;
      value: string;
      url: string;
    };
    cookieBanner: {
      name: string;
      value: string;
      url: string;
    };
  };
};
