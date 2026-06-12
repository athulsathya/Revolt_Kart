import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cart: [],
    addresses: [],
    selectedAddress: null, //currently chosooen address.
  },

  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },

    setCart: (state, action) => {
      state.cart = action.payload;
    },

    clearCart: (state) => {
      state.cart = [];
    },

    // Address Management
    addAddress: (state, action) => {
      if (!state.addresses) state.addresses = [];
      state.addresses.push(action.payload);
    },

    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },

    deleteAddress: (state, action) => {
      // const index = action.payload;

      state.addresses = state.addresses.filter(
        (_, index) => index !== action.payload,
      );

      //Reset selctedAddress if it was deleted
      if (state.selectedAddress === action.payload) {
        state.selectedAddress = null;
      }
    },
  },
});

export const {
  setProduct,
  setCart,
  clearCart,
  addAddress,
  setSelectedAddress,
  deleteAddress,
} = productSlice.actions;

export default productSlice.reducer;
