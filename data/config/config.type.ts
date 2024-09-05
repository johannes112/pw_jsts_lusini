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
  testdata: {
    article: {
      name: string;
      articleNumber: string;
      url: string;
    };
    user: {
      firstname: string;
      lastname: string;
      email: string;
      phone: string;
      company: string;
      street: string;
      streetNumber: string;
      zip: string;
      city: string;
      country: string;
      vatId: string;
      password: string;
    };
  };
};
