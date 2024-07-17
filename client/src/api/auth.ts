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

  async userCheckByToken(token: string) {
    try {
      const response = await this.fetchData("GET", "auth/usercheckbytoken", {
        headers: { authorization: "Bearer " + token },
      });

      console.log("auth/usercheckbytoken resp ", response);
    } catch (err: unknown) {
      console.log("auth/usercheckbytoken eror ", err);
    }
  }
  async register(body: InputField): Promise<ResAuth> {
    const response = await this.fetchData("POST", "auth/register", {
      body,
    });
    const resp = await response.json();
    if (response.status == 201) {
      const token = await signInWithCustomToken(fireAuth, resp.data.jwt);

      localStorage.setItem("accessToken", await token.user.getIdToken());
      localStorage.setItem("refreshToken", token.user.refreshToken);

      return { status: "success", msg: resp.data };
    } else {
      return { status: "error", err: resp.data.err };
    }
  }
}

const authApi = new Auth();

export default authApi;
