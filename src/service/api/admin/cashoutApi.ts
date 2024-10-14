import api from "../../../config/axios/api"

export const cashOutApi = {
    getCashOut: async () => {
      try {
        const response = await api.get('cashouts')
        return response.data
      } catch (error: any) {
        throw error.response.data
      }
    },
    confirmCashOut: async (id:number) => {
        try {
          const response = await api.put(`cashouts/completed/${id}`)
          return response.data
        } catch (error: any) {
          throw error.response.data
        }
      },
}