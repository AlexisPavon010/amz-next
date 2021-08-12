import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";


export const initialState = {
    cart: [],
    bookmarks: [],
    products: [],
    user: null,
    loadingBar: null,
    category: "all",
    fuse: null,
};

const getCartTotal = (state) =>
  
    state.basket?.cart
      ?.reduce((total, item) => (total + JSON.parse(item).price), 0)
      .toFixed(2);



export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            // console.log(action.payload.id,)
            const itemIndex = state.cart.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            );
            let newCart = [...state.cart];
            if (itemIndex >= 0) {
                newCart[itemIndex].quantity += 1;
            } else {
                newCart = [...state.cart, JSON.stringify(action.payload)];
            }
            localStorage.setItem("cart", JSON.stringify(newCart));
            return {
                ...state,
                cart: newCart,
            };
        },
        removeFromBasket: (state, action) => {
            const itemIndex = state.cart.findIndex(
                (cartItem) => cartItem.id === action.id
            );
            let newCart = [...state.cart];
            if (itemIndex >= 0) {
                if (newCart[itemIndex].quantity > 1) {
                    newCart[itemIndex].quantity -= 1;
                } else {
                    newCart.splice(itemIndex, 1);
                }
            } else {
                console.warn("Item Not Found");
            }
            localStorage.setItem("cart", JSON.stringify(newCart));
            return {
                ...state,
                cart: newCart,
            };
        },

        restoreCart: (state, action) => {
            console.log(action.payload.cart)
            return {
                ...state,
                cart: action.payload.cart,
            };
        }
    },
})

// const getCartTotal = (state) => state.basket.cart
const getTotalItems = (state) =>
    state.basket.cart

export const { addToBasket, removeFromBasket, restoreCart } = basketSlice.actions;

// export const getTotalItems = (state) => state.basket.cart;
// export const getCartTotal = (state) => state.basket.cart.reduce((total, item) => total + item.price, 0);

export { getTotalItems, getCartTotal }

export default basketSlice.reducer;