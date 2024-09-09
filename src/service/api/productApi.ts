import api from "../../config/axios/api"

export const productApi = {
  createProduct: async (data: any) => {
    try {
      const response = await api.post('product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  }
}