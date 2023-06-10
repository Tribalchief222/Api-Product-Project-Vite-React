import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity < 1) {
        return state.filter((item) => item.id !== id);
      }
      return state.map((item) => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      });
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
