import api from "../../../config/axios/api";

export const revenueApi = {
  getRevenue: async (startDate: string = "", endDate: string = "") => {
    try {
      const response = await api.get(
        `dashboards/revenue?startDate=${startDate}&endDate=${endDate}`
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
