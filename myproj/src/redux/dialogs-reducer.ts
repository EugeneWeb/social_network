import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ResultCodesEnum } from "../api/api";
import { usersAPI } from "../api/users-api";
import { createAppAsyncThunk } from "../hooks/redux";
import { MessageType, ProfileType, UserType } from "../types/types";


let initialState = {
    messages: [] as MessageType[], 
    otherUser: {} as UserType,
    newMessageBody: "Введите новое сообщение...",
};


const dialogsSlice = createSlice({
    name: 'dialogsPage',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(requestUsersMessages.fulfilled, (state, {payload: resp}) => {
                state.messages = resp ? [...resp]: []
            })

            .addCase(sendUsersMessage.fulfilled, (state, {payload: resp}) => {
                if (resp?.resultCode === ResultCodesEnum.Success) {
                    state.messages.push(resp.message)
                }
            })

            .addCase(requestUser.fulfilled, (state, {payload: resp}) => {
                if (resp?.resultCode === ResultCodesEnum.Success) {
                    state.otherUser = resp.user
                }
            })
    },
})

export default dialogsSlice.reducer

export const {} = dialogsSlice.actions

export const requestUsersMessages = createAppAsyncThunk<MessageType[] | undefined, {currentUserId: string, otherUserId: string}>(
    "REQUEST-USERS-MESSAGES",
    async ({currentUserId, otherUserId}, { rejectWithValue }) => {
        try {
            const user = await usersAPI.getUserMessages(currentUserId,otherUserId );
            if(user.resultCode === ResultCodesEnum.Success ) {
                return user.messages
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);
export const sendUsersMessage = createAppAsyncThunk<{
    message:MessageType,
    resultCode: ResultCodesEnum;
} | undefined, {otherUserId: string, message: string}>(
    "SEND-USERS-MESSAGES",
    async ({message, otherUserId}, { rejectWithValue }) => {
        try {
            const user = await usersAPI.sendUsersMessage(message,otherUserId );
            return user
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);
export const requestUser = createAppAsyncThunk<{
    user: UserType
    resultCode: ResultCodesEnum;
} | undefined, string>(
    "REQUEST-USER",
    async (otherUserId, { rejectWithValue }) => {
        try {
            const user = await usersAPI.getUser(otherUserId);
            return user
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);