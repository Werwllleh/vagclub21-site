import {instance} from "@/api/axios";

class UploadService {

  async upload() {
    return await instance.post(`/protect/upload`)
  }

}

export default new UploadService();
