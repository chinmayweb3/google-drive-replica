type InputField = {
  email: string;
  password: string;
};

type ResAuth =
  | {
      status: "success";
      msg: string;
    }
  | { status: "error"; err: string };

class Auth {
  private baseUrl = "http://localhost:4000/";

  register = async (body: InputField): Promise<ResAuth> => {
    const response = await fetch(`${this.baseUrl}auth/register`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status == 204) {
      return { status: "success", msg: data.data };
    } else {
      return { status: "error", err: data.data };
    }
  };
}

const authApi = new Auth();

export default authApi;
