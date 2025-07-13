import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface AuthState {
  user: any;
  token: string | null;
  roles: string[];
}

const initialState: AuthState = {
  user: null,
  token: null,
  roles: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.roles = action.payload.roles;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRoles = (state: RootState) => state.auth.roles;

export default authSlice.reducer;
