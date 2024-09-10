import api from "../../config/axios/api";

export const profileApi = {
  getProductMe: async () => {
    try {
      const response = await api.get("product/me");
      return response.data;
    } catch (e: any) {
      throw e.response.data;
    }
  },
};
