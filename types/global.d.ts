declare global {
  namespace NodeJS {
    interface Global {
      __BASE_URL__: string;
    }
  }
}

export {};
