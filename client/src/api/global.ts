type IMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface IFetchData {
  body?: unknown;
  headers?: Record<string, string>;
}

export class globalClass {
  protected baseURL = "http://localhost:4000/";

  async fetchData(method: IMethod, path: string, props: IFetchData) {
    const headers = props.headers
      ? props.headers
      : { "Content-Type": "application/json" };
    const body = props.body ? JSON.stringify(props.body) : undefined;
    console.log("body", body);

    const response = await fetch(`${this.baseURL}${path}`, {
      method,
      // mode: "no-cors",
      body,

      headers,
    });

    console.log("fetch ", response);

    return response;
  }
}
