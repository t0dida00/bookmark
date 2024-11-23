import { loadStateFromLocalStorage, saveStateToLocalStorage } from "@/app/utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = loadStateFromLocalStorage() || {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            saveStateToLocalStorage(state);
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
