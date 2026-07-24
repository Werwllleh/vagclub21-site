import {instance} from "@/api/axios";

class AdminService {

  ADMIN = '/admin';

  // Статистика дашборда: {users, cars, partners}
  async getStats() {
    return instance.get(`${this.ADMIN}/stats`);
  }

  // Журнал событий (keyset-пагинация): {events, nextCursor, hasMore}
  async getEvents({cursor, limit = 15} = {}) {
    return instance.get(`${this.ADMIN}/events`, {
      params: {limit, ...(cursor ? {cursor} : {})},
    });
  }

  // Список пользователей с ролями и компаниями; поиск по chatId/имени
  async getUsers(search) {
    return instance.get(`${this.ADMIN}/users`, {
      params: search ? {search} : {},
    });
  }

  // Назначить роль пользователю (только superadmin)
  async setRole(chatId, role) {
    return instance.post(`${this.ADMIN}/roles`, {chatId, role});
  }

  // Прикрепить компанию (companyId из CMS) к пользователю по chatId
  async attachCompany(chatId, companyId) {
    return instance.post(`${this.ADMIN}/companies/attach`, {chatId, companyId});
  }

  // Открепить компанию
  async detachCompany(chatId, companyId) {
    return instance.post(`${this.ADMIN}/companies/detach`, {chatId, companyId});
  }

}

export default new AdminService();
