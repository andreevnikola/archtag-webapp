import { apiUrl } from "../config";
import { useRequestr } from "../hooks/requestr-hook";
import consoleErrorHandler from "./error-handlers/consoleErrorHandler";
import notificationErrorHandler from "./error-handlers/notificationErrorHandler";

export type RestMethods = "GET" | "POST" | "PUT" | "DELETE";

// export interface IRequest<Body, Ret> {
//   url: string;
//   method: RestMethods;
//   headers: Headers;
//   body: Body;
//   retries: number;
//   builder<Body, Ret>: () => IRequestBuilder<Body, Ret>;
//   errorHandler: (error: Error) => void;
//   handler: (data: Ret) => void;
// }

// export interface IRequestBuilder<Body, Ret> {
//   request: Request<Body, Ret>;
//   url: (url: string) => RequestBuilder<Body, Ret>;
//   method: (method: RestMethods) => RequestBuilder<Body, Ret>;
//   customErrorHandler: (
//     customErrorHandler: (error: Error) => void
//   ) => RequestBuilder<Body, Ret>;
//   handler: (handler: (data: Ret) => void) => RequestBuilder<Body, Ret>;
//   useNotificatonErrorHandler: () => RequestBuilder<Body, Ret>;
//   build: () => Request<Body, Ret>;
// }

export interface ReqError {
  status: number;
  message: string;
}

export class Request<Body, Ret> {
  url: string;
  method: RestMethods;
  headers: Headers;
  body: string | FormData | undefined;
  retries: number;
  errorHandler: (error: ReqError) => void;
  isMultipart: boolean;

  static builder<Body, Ret>() {
    return new RequestBuilder<Body, Ret>();
  }

  constructor({
    route,
    method,
    headers,
    body,
    retries,
    errorHandler,
    isMultipart,
  }: {
    route: string | undefined;
    method: RestMethods | undefined;
    headers: any | undefined;
    body: string | FormData | undefined;
    retries: number | undefined;
    errorHandler?: (error: ReqError) => void;
    isMultipart: boolean | undefined;
  }) {
    this.url = apiUrl + route || "";
    this.method = method || "GET";
    this.headers = headers || new Headers();
    this.isMultipart = isMultipart || false;

    if (!this.isMultipart) {
      this.headers.set("Content-Type", "application/json");
      this.body = body ? JSON.stringify(body) : undefined;
    } else {
      this.body = body;
    }

    this.retries = retries || 3;
    this.errorHandler = errorHandler || consoleErrorHandler;
  }

  setBody(body: Body): Request<Body, Ret> {
    if (body instanceof FormData) {
      this.body = body;
      this.headers.delete("Content-Type");
    } else {
      this.body = JSON.stringify(body);
      this.headers.set("Content-Type", "application/json");
    }
    return this;
  }

  setParam(paramWildCard: string, value: string): Request<Body, Ret> {
    this.url = this.url.replace(`:${paramWildCard}`, value);
    return this;
  }

  setParams(params: Map<string, string>): Request<Body, Ret> {
    for (const [key, value] of params) {
      this.setParam(key, value);
    }
    return this;
  }

  async send(): Promise<{
    res: Ret | null;
    error: ReqError | null;
  }> {
    const response = await fetch(this.url, {
      method: this.method,
      headers: this.headers,
      body: this.body,
    });

    let data = null;

    try {
      data = await response.json();
    } catch (e) {}

    if (!response.ok) {
      if (this.retries > 0 && response.status >= 500) {
        this.retries--;
        return await this.send();
      }

      this.errorHandler({
        status: response.status,
        message: data?.message || "Нещо се обърка!",
      });
      return {
        res: null,
        error: {
          status: response.status,
          message: response.statusText,
        },
      };
    }

    return { res: data, error: null };
  }
}

export class RequestBuilder<Body, Ret> {
  request: Request<Body, Ret>;

  constructor() {
    this.request = new Request<Body, Ret>({
      route: undefined,
      method: undefined,
      headers: undefined,
      body: undefined,
      retries: undefined,
      errorHandler: undefined,
      isMultipart: undefined,
    });
  }

  retries(retries: number): RequestBuilder<Body, Ret> {
    this.request.retries = retries;
    return this;
  }

  body(body: Body): RequestBuilder<Body, Ret> {
    this.request.setBody(body);
    return this;
  }

  headers(headers: any) {
    this.request.headers = new Headers({
      ...headers,
    });
    return this;
  }

  url(url: string): RequestBuilder<Body, Ret> {
    this.request.url = apiUrl + url;
    return this;
  }

  method(method: RestMethods): RequestBuilder<Body, Ret> {
    this.request.method = method;
    return this;
  }

  customErrorHandler(
    customErrorHandler: (error: ReqError) => void
  ): RequestBuilder<Body, Ret> {
    this.request.errorHandler = customErrorHandler;
    return this;
  }

  useNotificatonErrorHandler(): RequestBuilder<Body, Ret> {
    this.request.errorHandler = notificationErrorHandler;
    return this;
  }

  multipart(isMultipart: boolean): RequestBuilder<Body, Ret> {
    this.request.isMultipart = isMultipart;
    return this;
  }

  build(): Request<Body, Ret> {
    return this.request;
  }

  useRequestr() {
    return useRequestr<Body, Ret>(this.request);
  }
}
