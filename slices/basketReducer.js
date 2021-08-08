import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";


const initialState = {
    items: [],
};


export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        chageState: (state, action) => {
            // console.log(action.payload)
            state.items = [...initialState.items,  action.payload]
            // state.items = [...state.items, action.payload]
        },
        addToBasket: (state, action) => {
            const { session, id, title, price, description, category, image, } = action.payload
            if(!session) {
                alert('Inicia Sesion!')
                return
            }
            db.collection('user').doc(session.user.email).collection('basket').add({
                id,
                title,
                price,
                description,
                category,
                image,
            }).then(doc => {
                db.collection('user').doc(session.user.email).collection('basket').doc(doc.id).update({
                    docId: doc.id
                })
            })
            


            state.items = [...state.items, action.payload]

        },
        removeFromBasket: (state, action) => {
            const { session, docId } = action.payload
            console.log(action.payload)
            
            db.collection('user').doc(session.user.email).collection('basket').doc(docId).delete()
            state.items = [...initialState.items,  action.payload]
            const index = state.items.findIndex(
                (basketItem) => basketItem.id === action.payload.id
            );
            let newBasket = [...state.items];
            if (index >= 0) {
                newBasket.splice(index, 1)
            } else {
                console.warn(
                    `Cant Remove Product (id: ${action.payload.id} as its not in the basket)`
                );
            }
            state.items = newBasket;
        },
    },
})

export const { addToBasket, removeFromBasket, chageState } = basketSlice.actions;

export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;