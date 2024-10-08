import api from "../../config/axios/api";
import { ChangePasswordData } from "../../model/profile";

export const profileApi = {
  getProductMe: async () => {
    try {
      const response = await api.get("product/me");
      return response.data;
    } catch (e: any) {
      throw e.response.data;
    }
  },
  getAuctionMe: async () => {
    try {
      const response = await api.get("auction/myauction");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getProfileUser: async () => {
    try {
      const response = await api.get("user/profile");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getMyProfile: async () => {
    try {
      const response = await api.get("user/profile");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  changePassword: async (data: ChangePasswordData) => {
    try {
      const response = await api.put("user/changepassword", data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
