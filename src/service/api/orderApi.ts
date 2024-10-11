import axios from "axios";
import api from "../../config/axios/api";
import { Order } from "../../model/order";

const TokenGHN = "43a8eec9-7b4c-11ef-b441-069be3e54cb9";

export const orderApi = {
  getAllOrder: async () => {
    try {
      const response = await api.get("order");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
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
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            "Content-Type": "application/json",
            Token: `${TokenGHN}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getDistrictApi: async (province: string) => {
    try {
      const response = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
        {
          headers: {
            token: TokenGHN, // Your token
            "Content-Type": "application/json",
          },
          params: {
            province_id: province, // Pass the province_id as a query parameter
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getWardApi: async (district: string) => {
    try {
      const response = await axios.get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
        {
          headers: {
            token: TokenGHN, // Your token
            "Content-Type": "application/json",
          },
          params: {
            district_id: district, // Pass the province_id as a query parameter
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  deliveredOrder: async (id: number) => {
    try {
      const response = await api.put(`order/delivered/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  sendOrder: async (id: number) => {
    try {
      const response = await api.put(`order/sent/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  receivedOrder: async (id: number) => {
    try {
      const response = await api.put(`order/received/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  orderDetail: async (id: number) => {
    try {
      const response = await api.get(`order/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
