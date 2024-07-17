type IMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IFetchData {
  body?: unknown;
  headers?: Record<string, string>;
}

export class globalClass {
  protected baseURL = "http://localhost:4000/";

  async fetchData(method: IMethod, path: string, props: IFetchData) {
    const headers = props.headers ? { ...props.headers } : {};
    const response = await fetch(`${this.baseURL}${path}`, {
      method,
      headers,
      body: JSON.stringify(props.body),
    });

    return response;
  }
}
