import api from "../../config/axios/api";

export const sellerApi = {
  getSellerProfile: async (id: number) => {
    try {
      const response = await api.get(`account/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getSellerProduct: async (id: number) => {
    try {
      const response = await api.get(`auction/seller/${id}`)
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  }
};
