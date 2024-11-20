declare module 'redux-persist-cookie-storage' {
  import { Storage } from 'redux-persist';

  interface CookieStorageOptions {
      expiration?: {
          default?: number;
          [key: string]: number | undefined;
      };
      setCookieOptions?: {
          path?: string;
          expires?: Date;
          maxAge?: number;
          domain?: string;
          secure?: boolean;
          httpOnly?: boolean;
          sameSite?: 'strict' | 'lax' | 'none';
      };
      getCookies?: () => { [key: string]: string };
  }

  export class CookieStorage implements Storage {
      constructor(options?: CookieStorageOptions);
      getItem(key: string): Promise<string | null>;
      setItem(key: string, value: string): Promise<void>;
      removeItem(key: string): Promise<void>;
  }
}
