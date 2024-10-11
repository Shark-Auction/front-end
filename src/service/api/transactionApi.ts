import api from "../../config/axios/api";

export const transactionApi = {
  getAllTransaction: async () => {
    try {
      const response = await api.get(`transactions`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
}