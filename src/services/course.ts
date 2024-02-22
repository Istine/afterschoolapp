import http from "@/http";
import { CourseCreationType } from "@/types";

export const getCourses = async (path: string) => {
  try {
    const response = await http.get(path);

    if (response.status == 200) {
      if (response.data?.courses) return response.data?.courses;
      return response.data.course;
    }
    return [];
  } catch (error) {
    return [];
  }
};

const getSignedUrl = async (
  filename: string,
  contentType: string,
  type: string
) => {
  try {
    const response = await http.get("/course/signed-url", {
      params: { filename, contentType, type },
    });

    if (response.status === 200) {
      return response.data;
    }
    return "";
  } catch (error) {
    return "";
  }
};

export const createCourse = async (
  filename: string,
  contentType: string,
  file: Blob,
  course: CourseCreationType,
  setProgress: any,
  thumbnail: Blob
) => {
  try {
    const { signedUrl, key } = await getSignedUrl(
      filename,
      contentType,
      "video"
    );
    const thumbnailAsset = thumbnail as File;
    const thumbnailResponse = await getSignedUrl(
      thumbnailAsset.name,
      thumbnailAsset.type,
      "images"
    );
    const results = await Promise.allSettled([
      await http.put(signedUrl, file, {
        onUploadProgress(progressEvent) {
          const loaded = progressEvent.loaded;
          const total = progressEvent.total || 1;
          setProgress((prevProgress: any) => {
            const progress = Math.round((loaded / total) * 100);
            return {
              ...prevProgress,
              progress,
              currentOp: "uploading trailer",
            };
          });
        },
        headers: {
          "Content-Type": contentType,
        },
      }),
      await http.put(thumbnailResponse.signedUrl, thumbnail, {
        onUploadProgress(progressEvent) {
          const loaded = progressEvent.loaded;
          const total = progressEvent.total || 1;
          setProgress((prevProgress: any) => {
            const progress = Math.round((loaded / total) * 100);
            return {
              ...prevProgress,
              progress,
              currentOp: "uploading thumbnail",
            };
          });
        },
        headers: {
          "Content-Type": thumbnailAsset.type,
        },
      }),
    ]);

    const modifiedCourse: CourseCreationType = {
      ...course,
      videoTrailerUrl: key,
      thumbnail: thumbnailResponse.key,
    };
    const response = await http.post("/course", modifiedCourse);
    if (response.status === 201) {
      return [response.data.course, null];
    }
    return [null, "could not create course"];
  } catch (error) {
    return [null, "could not create course"];
  }
};

export const updateCourseById = async (
  data: CourseCreationType,
  file?: {
    filename: string;
    contentType: string;
    setProgress: any;
    blob: Blob;
  },
  thumbnail?: {
    filename: string;
    contentType: string;
    setProgress: any;
    blob: Blob;
  }
) => {
  try {
    const promises = [];
    let trailer, thumbRes;
    if (file) {
      trailer = await getSignedUrl(file.filename, file.contentType, "video");
      promises.push(
        await http.put(trailer.signedUrl, file.blob, {
          onUploadProgress(progressEvent) {
            const loaded = progressEvent.loaded;
            const total = progressEvent.total || 1;
            file.setProgress((prevProgress: any) => {
              const progress = Math.round((loaded / total) * 100);
              return {
                ...prevProgress,
                progress,
                currentOp: "uploading trailer",
              };
            });
          },
          headers: {
            "Content-Type": file.contentType,
          },
        })
      );
    }
    if (thumbnail) {
      thumbRes = await getSignedUrl(
        thumbnail.filename,
        thumbnail.contentType,
        "images"
      );
      promises.push(
        await http.put(thumbRes.signedUrl, thumbnail.blob, {
          onUploadProgress(progressEvent) {
            const loaded = progressEvent.loaded;
            const total = progressEvent.total || 1;
            thumbnail.setProgress((prevProgress: any) => {
              const progress = Math.round((loaded / total) * 100);
              return {
                ...prevProgress,
                progress,
                currentOp: "uploading thumbnail",
              };
            });
          },
          headers: {
            "Content-Type": thumbnail.contentType,
          },
        })
      );
    }
    if (promises.length) {
      await Promise.all(promises);
      const modifiedCourse: CourseCreationType = {
        ...data,
        ...(file && {
          videoTrailerUrl:
            "https://e-learning-app-profile-pictures-v1.s3.us-east-2.amazonaws.com/" +
            trailer.key,
        }),
        ...(thumbnail && {
          thumbnail:
            "https://e-learning-app-profile-pictures-v1.s3.us-east-2.amazonaws.com/" +
            thumbRes.key,
        }),
      };
      const response = await http.put("/course", modifiedCourse);
      if (response.status === 200) {
        return [response.data.course, null];
      }
      return [null, "could not update course"];
    } else {
      const response = await http.put("/course", data);
      if (response.status === 200) {
        return [response.data.course, null];
      }
      return [null, "could not update course"];
    }
  } catch (error) {
    return [null, "could not update course"];
  }
};

export const deleteCourseById = async (id: string) => {
  try {
    const response = await http.delete(`/course/${id}`);
    if (response.status === 200) return response.data;
    return null;
  } catch (error) {
    return null;
  }
};
