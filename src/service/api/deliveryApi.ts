import api from "../../config/axios/api";
import { DeliveryRequestReceiver } from "../../model/delivery";

export const deliveryApi = {
  receiverDelivery: async (data: DeliveryRequestReceiver) => {
    try {
      const response = await api.post("delivery/receiver", data);
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  }
}