import { globalClass } from "./global";

type InputField = {
  email: string;
  password: string;
};

type ResAuth =
  | {
      status: "success";
      msg: string;
    }
  | { status: "error"; err: any };

interface IAuth {
  register(body: InputField): Promise<ResAuth>;
}

class Auth extends globalClass implements IAuth {
  constructor() {
    super();
  }
  async register(body: InputField): Promise<ResAuth> {
    const response = await this.fetchData("POST", "auth/register", {
      body,
    });
    const resp = await response.json();

    if (response.status == 201) {
      return { status: "success", msg: resp.data };
    } else {
      return { status: "error", err: resp.data };
    }
  }
}

const authApi = new Auth();

export default authApi;
