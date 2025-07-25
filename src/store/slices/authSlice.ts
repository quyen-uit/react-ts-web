import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store/store';

interface AuthState {
  user: any;
  accessToken: string | null;
  roles: string[];
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  roles: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.roles = action.payload.roles;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.roles = [];
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, setAccessToken } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentRoles = (state: RootState) => state.auth.roles;

export default authSlice.reducer;
