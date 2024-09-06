import {createSlice} from '@reduxjs/toolkit';
type AuthState = {
  loggedIn: boolean;
  user: {};
  token: string | null;
  role: string;
  name: string;
};

const initialState: AuthState = {
  loggedIn: false,
  user: {},
  token: null,
  role: '',
  name: '',
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
    setRole: (state, {payload}) => {
      state.role = payload;
    },
    setName: (state, {payload}) => {
      state.name = payload;
    },
  },
});

export const {updateLoggedIn, setToken, setRole,setName} = user.actions;
export default user.reducer;
