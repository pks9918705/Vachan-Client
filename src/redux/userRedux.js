import { createSlice } from "@reduxjs/toolkit";




const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;

      console.log('token update krne jaa rha hoon', action.payload.accessToken);

      localStorage.setItem('token', action.payload.accessToken);

      console.log('user redux hoon');

    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      
      state.currentUser = null;
      state.isFetching= false;
      console.log('logout is clicked',state.isFetching)
      state.error= false;
       
      localStorage.clear();
       

    },
    // resetIsFetching: (state) => {
    //   state.isFetching = false;
    // },
  },
});

export const { loginStart, loginSuccess, resetIsFetching,loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
