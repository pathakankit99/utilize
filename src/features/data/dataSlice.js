import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    orders:[],
    userLoggedIn:false,
    user:null,
  },
  reducers: {
    addOrders:(state, action)=>{
      state.orders = action.payload;
    },
    updateOrders:(state, action)=>{
      state.orders.forEach((order) => {
        if (order.id === action.payload.id) {   
            order.customer_name=action.payload.newName
            order.customer_email=action.payload.newEmail
            order.product=action.payload.newProduct
            order.quantity=action.payload.newQuantity
        }
      });
    },
    UserLogIn: (state,action)=>{
      state.userLoggedIn=true
      state.user=action.payload
    },
    UserLogout: state=>{
      state.userLoggedIn=false
      state.user=null
    },
  },
});

export const { addOrders, updateOrders, UserLogIn, UserLogout } = dataSlice.actions;
export const selectCount = state => state.data.value;
export const selectOrders = state => state.data.orders;

export const checkUserStatus = state => state.data.userLoggedIn;

export default dataSlice.reducer;
