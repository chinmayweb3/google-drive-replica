import { globalClass } from "./global";

interface IDrive {}
class Drive extends globalClass implements IDrive {
  constructor() {
    super();
  }

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    await fetch(`${this.baseURL}document`, {
      method: "POST",
      body: formData,
    });
  }
}

const driveApi = new Drive();

export default driveApi;
