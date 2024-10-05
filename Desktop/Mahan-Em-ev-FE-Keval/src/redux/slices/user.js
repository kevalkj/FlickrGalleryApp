import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  user: {},
  token: null,
  role: '',
  name: '',
  phone : '', 
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateLoggedIn: (state, {payload}) => {
      state.loggedIn = payload;
    },
    setToken: (state, {payload}) => {
      state.token = payload;
    },
    setPhone: (state, {payload}) => {
      state.phone = payload;
    },
  },
});

export const {updateLoggedIn, setToken, setPhone } = user.actions;
export default user.reducer;
