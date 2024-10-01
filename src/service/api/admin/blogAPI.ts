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
  addBlog: async (data: any) => {
    try {
      console.log('api')
      const response = await api.post('blog', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      )
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
}