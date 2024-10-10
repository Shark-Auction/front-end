import { createSlice } from "@reduxjs/toolkit";

const initialState: any = null;

export const walletSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setWalletUser: (_, action) => action.payload,
  },
});

export const { setWalletUser } = walletSlice.actions;
export default walletSlice.reducer;
