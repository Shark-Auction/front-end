import api from "../../../config/axios/api"

export const accountApi = {
  getAccount: async () => {
    try {
      const response = await api.get('account')
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
  banAccount: async (id: number) => {
    try {
      const response = await api.put(`account/${id}/ban`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  unBanAccount: async (id: number) => {
    try {
      const response = await api.put(`account/${id}/unban`);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
  
  setRoleAccount: async (id: number,data:any) => {
    try {
      const response = await api.put(`account/${id}`,data);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  },
}

export const staffApi = {
    getAccount: async () => {
      try {
        const response = await api.get('account/staffs')
        return response.data
      } catch (error: any) {
        throw error.response.data
      }
    },
    addStaff: async (data:any) => {
        try {
          const response = await api.post('account/users/staffs',data)
          return response.data
        } catch (error: any) {
          throw error.response.data
        }
      }
  }

  export const managerApi = {
   
    getAccount: async () => {
      try {
        const response = await api.get('account/managers')
        return response.data
      } catch (error: any) {
        throw error.response.data
      }
    }
  }

 