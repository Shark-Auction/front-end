import api from "../../config/axios/api"

export const auctionApi = {
  addAuction: async (data: any) => {
    try {
      const response = await api.post('auction', data)
      return response.data
    } catch(error: any) {
      throw error.response.data
    }
  },
}