import api from "../../config/axios/api"

export const originApi = {
  getOrigin: async () => {
    try {
      const response = await api.get('origin')
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  }
}