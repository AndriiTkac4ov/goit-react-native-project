import { createSlice } from "@reduxjs/toolkit";

const state = {
    userId: null,
    name: null,
    userAvatar: null,
    stateChange: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            userAvatar: payload.userAvatar,
            name: payload.name,
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange,
        }),
        authSighOut: () => state,
    },
})
