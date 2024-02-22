import http from "@/http";
import { LessonFormType } from "@/types";

export const getLessons = async (path: string) => {
  try {
    const response = await http.get(path);
    if (response.status === 200) {
      if (response.data?.lessons) return response.data.lessons;
      return response.data.lesson;
    }
    return [];
  } catch (error) {
    return [];
  }
};

const getSignedUrl = async (filename: string, contentType: string) => {
  try {
    const response = await http.get("/lesson/signed-url", {
      params: { filename, contentType },
    });

    if (response.status === 200) {
      return response.data;
    }
    return "";
  } catch (error) {
    return "";
  }
};

export const uploadVideo = async (
  filename: string,
  contentType: string,
  file: Blob,
  setProgress: any,
  index: number
) => {
  const { signedUrl, key } = await getSignedUrl(filename, contentType);
  const response = await http.put(signedUrl, file, {
    onUploadProgress(progressEvent) {
      const loaded = progressEvent.loaded;
      const total = progressEvent.total || 1;
      setProgress((prevProgress: Array<number>) => {
        prevProgress[index] = Math.round((loaded / total) * 100);
        return [...prevProgress];
      });
    },
    headers: {
      "Content-Type": contentType,
    },
  });

  return { key, index };
};

export const createLesson = async (
  id: string,
  data: Partial<LessonFormType>
) => {
  try {
    const response = await http.put(`/lesson`, { ...data, id });
    if (response.status == 200) {
      return [response.data, null];
    }
    return [null, new Error("could not create lessons")];
  } catch (error) {
    return [null, new Error("could not create lessons")];
  }
};

export const createLessons = async (data: Array<LessonFormType>) => {
  try {
    const response = await http.post("/lesson", data);
    if (response.status == 201) {
      return [response.data, null];
    }
    return [null, new Error("could not create lessons")];
  } catch (error) {
    return [null, new Error("could not create lessons")];
  }
};

export const deleteLessonById = async (id: string) => {
  try {
    const response = await http.delete(`/lesson/${id}`);
    if (response.status == 200) {
      return [response.data, null];
    }
    return [null, new Error("error deleting lesson")];
  } catch (error) {
    return [null, new Error("error deleting lesson")];
  }
};
