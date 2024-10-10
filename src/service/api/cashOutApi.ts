import axios from "axios";
import api from "../../config/axios/api";
import { CashOuts } from "../../model/cashOut";

export const cashOutApi = {
  getBanking: async () => {
    try {
      const response = await axios.get("https://api.vietqr.io/v2/banks");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  cashOutMoney: async (data: CashOuts) => {
    try {
      const response = await api.post("cashouts", data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
};
