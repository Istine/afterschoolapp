import http from "@/http";
import { AdminType } from "@/types";

export const getAdmin = async (path: string) => {
  try {
    const response = await http.get(path);
    if (response.status == 200) {
      return response.data.admin;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export const saveProfileChanges = async (body: AdminType) => {
  try {
    const response = await http.post("/admin", body);
    if (response.status === 200) {
      return [response.data.admin, null];
    }
    return [null, "could not update account info"];
  } catch (error) {
    return [null, "could not update account info"];
  }
};
