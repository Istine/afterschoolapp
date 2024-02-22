import http from "@/http";
import { ModuleCreationType, ModuleType } from "@/types";

export const getModules = async (path: string) => {
  try {
    const response = await http.get(path);
    if (response.status == 200) {
      if (response.data.modules) return response.data.modules;
      return response.data.module;
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const createModules = async (
  modules: Array<{ title: string; duration: string; lessons: string[] }>
) => {
  try {
    const response = await http.post("/module", modules);
    if (response.status == 201) {
      return [response.data.modules, null];
    }
    return [null, new Error(response.data.message)];
  } catch (error) {
    return [null, error];
  }
};

export const deleteModuleById = async (id: string) => {
  try {
    const response = await http.delete(`/module/${id}`);
    if (response.status == 200) {
      return [response.data.message, null];
    }

    return [null, response.data.message];
  } catch (error) {
    return [null, error];
  }
};

export const updateModuleById = async (body: ModuleType) => {
  try {
    const response = await http.put("/module", body);
    if (response.status == 200) {
      return [response.data.modules, null];
    }
    return [null, `error updating ${body.title}`];
  } catch (error) {
    return [null, error];
  }
};
