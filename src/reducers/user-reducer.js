
// src/store/reducers/userReducer.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      console.log(`user:${action.payload}`);
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      console.log(`loading:${action.payload}`);
      state.loading = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
