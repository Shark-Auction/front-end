import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrderData: (_, action) => action.payload,
    clearOrderData: () => {
      return initialState;
    },
  },
});

export const { createOrderData, clearOrderData } = orderSlice.actions;
export default orderSlice.reducer;
