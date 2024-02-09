import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
       
      // console.log(action.payload);
      const { _id, quantity, price, img,title } = action.payload;
      console.log(_id, quantity,price,title);
       
      const existingProduct = state.products.find(
        (product) => product._id === _id 
      );
    
      if (existingProduct) {
        // If the same product with the same color and size exists, update the quantity
        // console.log("i should work");
        existingProduct.quantity += quantity;
    
        // If updated quantity is zero, remove the product
        if (existingProduct.quantity === 0) {
          const index = state.products.indexOf(existingProduct);
          state.products.splice(index, 1);
        }
      } else {
        // If not, add a new product to the cart
        state.products.push({
          _id,
          quantity,
           
          title,
          price,
          img,
        });
      }
    
      // Update total and quantity
      state.quantity += quantity;
    
      // if product quantity becomes zero then remove completely from cart
      state.total += quantity * action.payload.price;
    },
    

    removeCompletely: (state, action) => {
      
      const areObjectsEqual = (obj1, obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
      
    }    
    

      const { payload } = action;
    
      // Use Array.findIndex to find the index based on a custom deep equality check
      const index = state.products.findIndex(product => areObjectsEqual(product, payload));
    
      if (index !== -1) {
        // Create a new array without the item to remove
        const newProducts = [...state.products.slice(0, index), ...state.products.slice(index + 1)];
    
        // Update the state with the new array
        state.products = newProducts;
    
        // Update total and quantity if needed
        // Note: Make sure to handle quantity and total appropriately based on your data structure
        state.quantity -= payload.quantity;
        state.total -= payload.price * payload.quantity;
      }
    },
    
    cartToZero:(state,action)=>{
      
       // Reset the cart state to its initial values
       state.products = [];
       state.quantity = 0;
       state.total = 0;
    }
   
  }
});

export const { addProduct, removeCompletely ,cartToZero} = cartSlice.actions;
export default cartSlice.reducer;