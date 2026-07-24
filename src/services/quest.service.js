import {axiosCmsClassic} from "@/api/axios";

class QuestService {

  async fetchQuestTask(id) {
    return axiosCmsClassic.get(`/quest/${id}`)
  }

}

export default new QuestService();
