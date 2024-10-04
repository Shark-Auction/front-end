import api from "../../config/axios/api";
import { PaymentRequest } from "../../model/payment";

export const paymentApi = {
  payment: async (data: PaymentRequest) => {
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
