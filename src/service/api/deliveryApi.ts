import api from "../../config/axios/api";
import {
  DeliveryDetailSeller,
  DeliveryRequestReceiver,
} from "../../model/delivery";

export const deliveryApi = {
  receiverDelivery: async (data: DeliveryRequestReceiver) => {
    try {
      const response = await api.post("delivery/receiver", data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getDeliveryByOrder: async (id: number) => {
    try {
      const response = await api.get(`delivery/order/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  sellerDelivery: async (id: number, data: DeliveryDetailSeller) => {
    try {
      const response = await api.put(`delivery/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  getAllDelivery: async () => {
    try {
      const response = await api.get(`delivery`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
