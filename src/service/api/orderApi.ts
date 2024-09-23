import api from "../../config/axios/api";
import { Order } from "../../model/order";

export const orderApi = {
  orderAuction: async (data: Order) => {
    try {
      const response = await api.post('order', data)
      return response.data
    } catch (error: any) {
      throw new error.response.data
    }
  },
  getMyBuyOrder: async () => {
    try {
      const response = await api.get('order/mybuy')
      return response.data
    } catch (error: any) {
      throw new error.response.data
    }
  }
} 