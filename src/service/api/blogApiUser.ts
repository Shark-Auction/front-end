import api from "../../config/axios/api";

export const blogApiUser = {
  getBlog: async () => {
    try {
      const response = await api.get("blog/all");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getDetailBlog: async (id: number) => {
    try {
      const response = await api.get(`blog/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
