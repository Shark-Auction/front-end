import api from "../../config/axios/api";
import { Order } from "../../model/order";

export const paymentApi = {
  payment: async (data: Order) => {
    try {
      const response = await api.post("payment", data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getPaymentByMe: async () => {
    try {
      const response = await api.get("payment/me");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
