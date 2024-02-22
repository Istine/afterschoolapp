import { LoginType } from "@/types";
import http from "@/http";
import { AxiosError } from "axios";

export const login = async (user: LoginType) => {
  try {
    const response = await http.post("/login", user);
    if (response.status >= 200 && response.status < 300) {
      return [response.data];
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const logout = async () => {
  try {
    const response = await http.get("/logout");
    if (response.status === 200) {
      return [response.data, null];
    }

    return [null, "error logging out"];
  } catch (error) {
    return [null, "error logging out"];
  }
};
