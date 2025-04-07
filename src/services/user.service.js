import {axiosClassic} from "@/api/axios";


class UserService {

  async fetchUser(chatId) {
    return await axiosClassic.post('/about-user', {
      chatId: chatId
    })
  }

}

export default new UserService();
