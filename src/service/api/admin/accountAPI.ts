import api from "../../../config/axios/api"

export const accountApi = {
  getAccount: async () => {
    try {
      const response = await api.get('account')
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
  banAccount: async (id: number) => {
    try {
      const response = await api.put(`account/${id}/ban`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
}

export const staffApi = {
    getAccount: async () => {
      try {
        const response = await api.get('staffs')
        return response.data
      } catch (error: any) {
        throw error.response.data
      }
    }
  }

 