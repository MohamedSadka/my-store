import { createSlice } from "@reduxjs/toolkit";

const saveCartToLocalstorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const foundedProduct = state.find(product => product.id === action.payload.id);
      if(foundedProduct) {
        
        foundedProduct.quantity += 1;
      }else {
        const productClone = {...action.payload, quantity: 1};
        state.push(productClone);
      }
      saveCartToLocalstorage(state);
    },
    deleteFromCart: (state, action) => {
      const updatedCart =  state.filter((product) => product.id !== action.payload.id);
      saveCartToLocalstorage(updatedCart);
      return updatedCart;

    },
    decrementTheQuantity: (state, action) => {
      const productIndex = state.findIndex(product => product.id === action.payload.id);
      if(productIndex !== -1) {
        const product = state[productIndex];
        if(product.quantity > 1) {
          product.quantity -= 1
        }else {
          state.splice(productIndex,1);
        }
      }
      saveCartToLocalstorage(state);
    } ,
    clearCart: ()=> {
      const clearedCart =  [];
      saveCartToLocalstorage(clearedCart);
      return clearedCart;
    }
  },
});

export const { addToCart , deleteFromCart, clearCart, decrementTheQuantity} = cartSlice.actions;
export default cartSlice.reducer;
