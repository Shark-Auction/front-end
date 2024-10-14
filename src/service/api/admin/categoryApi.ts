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
deleteCategory: async (id:number) => {
  try {
    const response = await api.delete(`category/${id}`)
    return response.data
  } catch (error: any) {
    throw error.response.data
  }
},
  getCategoryChildren: async(parentId:number) => {
    try {
      const response = await api.get(`category/children/${parentId}`)
      return response.data
    }
    catch (error:any) { 
      throw error.response.data
    }
  },
  addCategory: async (data: any) => {
    try {
      console.log('api')
      const response = await api.post('category', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      )
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
}