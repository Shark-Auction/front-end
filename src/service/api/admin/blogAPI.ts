import api from "../../../config/axios/api"

export const blogApi = {
  getBlog: async () => {
    try {
      const response = await api.get('blog/all')
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
}