import api from "../../config/axios/api";

export const productApi = {
  createProduct: async (data: any) => {
    try {
      const response = await api.post("product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  editProduct: async (id: number | undefined, data: any) => {
    try {
      const response = await api.put(`product/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  deleteProduct: async (id: number) => {
    try {
      const response = await api.delete(`product/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getProductById: async (id: number) => {
    try {
      const response = await api.get(`product/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
};
