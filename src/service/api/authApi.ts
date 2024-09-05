import api from "../../config/axios/api"
import { LoginInformation, UserSignUp } from "../../model/user"

const authApi = {
  signUpApi: async (data: UserSignUp) => {
    try {
      const response = await api.post('user/signup', data)
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
  signIn: async (data: LoginInformation) => {
    try {
      const response = await api.post('user/signin', data)
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
  checkEmail: async (email: string) => {
    try {
      const response = await api.get(`user/check-email?email=${email}`);
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  },
  checkUser: async (userName: string) => {
    try {
      const response = await api.get(`user/check-username?userName=${userName}`);
      return response.data
    } catch (error: any) {
      throw error.response.data
    }
  }
}

export default authApi