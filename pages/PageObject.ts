import { Locator } from "playwright";

export interface PageObject {
  initialize(): Promise<void>;
  cssPathes: {
    [key: string]: string;
  };
  elements: {
    [key: string]: () => Locator;
  };
  actions: {
    [key: string]: (...args: any[]) => Promise<void>; // Adjust the return type as necessary
  };
  assertions: {
    [key: string]: (...args: any[]) => Promise<void>; // Adjust the return type as necessary
  };
  urls: {
    [key: string]: string | undefined;
  };
}
