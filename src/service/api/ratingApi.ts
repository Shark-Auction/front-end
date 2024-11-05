import api from "../../config/axios/api";

export const ratingApi = {
  addRating: async (data: any) => {
    try {
      const response = await api.post("rating", data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getAllRating: async () => {
    try {
      const response = await api.get("rating");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
};
