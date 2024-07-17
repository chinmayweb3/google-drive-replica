import { signInWithCustomToken } from "firebase/auth";
import { globalClass } from "./global";
import { fireAuth } from "../config/firebase";

type InputField = {
  name?: string;
  email: string;
  password: string;
};

type ResAuth =
  | {
      status: "success";
      data: any;
    }
  | { status: "error"; err: any };

interface IAuth {
  register(b: InputField): Promise<ResAuth>;
  userCheckByToken(t: string): Promise<ResAuth>;
}

class Auth extends globalClass implements IAuth {
  constructor() {
    super();
  }

  async userCheckByToken(token: string): Promise<ResAuth> {
    try {
      const response = await this.fetchData("GET", "auth/usercheckbytoken", {
        headers: { authorization: "Bearer " + token },
      });

      console.log("auth/usercheckbytoken resp ", response);
      const json = await response.json();
      console.log("auth/usercheckbytoken json ", json);

      return { status: "success", data: json };
    } catch (err: unknown) {
      console.log("auth/usercheckbytoken eror ", err);

      return { status: "error", err };
    }
  }

  async register(body: InputField): Promise<ResAuth> {
    const response = await this.fetchData("POST", "auth/register", {
      body,
    });
    const resp = await response.json();

    if (response.status != 201) {
      return { status: "error", err: resp.data.err };
    }
    const token = await signInWithCustomToken(fireAuth, resp.data.jwt);

    const accessToken = await token.user.getIdToken();

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", token.user.refreshToken);

    return { status: "success", data: resp.data };
  }
}

const authApi = new Auth();

export default authApi;
