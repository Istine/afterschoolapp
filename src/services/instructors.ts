import http from "@/http";

export const createInstructor = async (formData: FormData) => {
  try {
    const response = await http.post("/instructor", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const getInstructors = async (path: string) => {
  try {
    const response = await http.get(path);
    if (response.data?.instructors) return response.data.instructors;
    else return response.data.instructor;
  } catch (error) {
    return [];
  }
};

export const updateInstructorById = async (body: FormData) => {
  try {
    const response = await http.put(`/instructor`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status == 200) {
      return response.data.instructor;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const deleteInstructorById = async (id: string) => {
  try {
    const response = await http.delete(`/instructor/${id}`);
    if (response.status === 200) return response.data;
    return null;
  } catch (error) {
    return null;
  }
};
