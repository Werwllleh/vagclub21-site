import {instance} from "@/api/axios";

class UploadService {

  upload(type, carId, partnerId) {
    return async (options) => {
      const { file, onSuccess, onError, onProgress } = options;

      if (!type) {
        console.log("Не указан тип загрузки")
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", type);

        if (type === 'car' && carId) {
          formData.append("carId", carId);
        }

        if (type === 'partner' && partnerId) {
          formData.append("partnerId", partnerId);
        }

        const response = await instance.post(`/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded / event.total) * 100);
              onProgress?.({ percent });
            }
          },
        });

        onSuccess?.(response.data);
      } catch (err) {
        console.error("Ошибка загрузки файла:", err);
        onError?.(err);
      }
    };
  }

  async uploadFiles(type, files, carId, partnerId) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files[]", file);
    });
    formData.append("type", type);
    if (carId) formData.append("carId", carId);
    if (partnerId) formData.append("partnerId", partnerId);

    return instance.post(`/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
  }

  async deleteFile(filename, type) {
    return instance.post(`/remove`, {
      filename: filename,
      type: type
    })
  }
}

export default new UploadService();
