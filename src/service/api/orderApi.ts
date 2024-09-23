import axios from "axios";
import api from "../../config/axios/api";
import { Order } from "../../model/order";

export const orderApi = {
  orderAuction: async (data: Order) => {
    try {
      const response = await api.post("order", data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getMyBuyOrder: async () => {
    try {
      const response = await api.get("order/mybuy");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getMySellOrder: async () => {
    try {
      const response = await api.get("order/mysell");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getProvinceApi: async () => {
    try {
      const response = await axios.get(
        "https://esgoo.net/api-tinhthanh/1/0.htm"
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getDistrictApi: async (province: string) => {
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/2/${province}.htm`
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getWardApi: async (district: string) => {
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/3/${district}.htm`
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
