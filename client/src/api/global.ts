type IMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IFetchData {
  body?: unknown;
  headers?: Record<string, string>;
}

export class globalClass {
  protected baseURL = "http://localhost:4000/";

  protected async fetchData(method: IMethod, path: string, props: IFetchData) {
    const headers = props.headers
      ? props.headers
      : { "Content-Type": "application/json" };
    const body = props.body ? JSON.stringify(props.body) : undefined;

    const response = await fetch(`${this.baseURL}${path}`, {
      method,
      body,
      headers,
    });

    return response;
  }
}
