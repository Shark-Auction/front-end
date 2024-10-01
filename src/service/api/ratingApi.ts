import api from "../../config/axios/api";

export const ratingApi = {
  addRating: async (data: any) => {
    try {
      const response = await api.post("rating", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
