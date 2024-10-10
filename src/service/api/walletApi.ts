import api from "../../config/axios/api";

export const walletApi = {
  getMyWallet: async () => {
    try {
      const response = await api.get("wallets/mywallet");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
};
