import api from "../../../config/axios/api"

export const categoryApi = {
  getCategory: async () => {
    try {
      const response = await api.get('category')
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  }
,
  getCategoryChildren: async(parentId:number) => {
    try {
      const response = await api.get(`category/children/${parentId}`)
      return response.data
    }
    catch (error:any) { 
      throw error.response.data
    }
  }
}