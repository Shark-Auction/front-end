import { createSlice } from "@reduxjs/toolkit"
import { UserAuthentication } from "../../../model/user";

const initialState: null | UserAuthentication = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (_, action) => action.payload,
    logout: () => {
      localStorage.removeItem('key')
      return initialState
    },
    updateAccessToken: (state: any, action) => {
      if(state) {
        state.accessToken = action.payload;
      }
    }
  }
})

export const { login, logout, updateAccessToken } = userSlice.actions;
export default userSlice.reducer;