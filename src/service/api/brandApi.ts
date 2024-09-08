import api from "../../config/axios/api"

export const brandApi = {
  getBrand: async () => {
    try {
      const response = await api.get('brand')
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  }
}