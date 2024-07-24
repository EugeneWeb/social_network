import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ResultCodesEnum } from "../api/api";
import { usersAPI } from "../api/users-api";
import { createAppAsyncThunk } from "../hooks/redux";
import { MessageType, ProfileType, UserType } from "../types/types";


let initialState = {
    // dialogs: [
    //     {
    //         id: 1,
    //         name: "Андрей",
    //         path: "http://localhost:5000/avatar/avatar1.svg",
    //     },
    //     {
    //         id: 2,
    //         name: "Александр",
    //         path: "http://localhost:5000/avatar/avatar1.svg",
    //     },
    //     {
    //         id: 3,
    //         name: "Михаил",
    //         path: "http://localhost:5000/avatar/avatar1.svg",
    //     },
    //     {
    //         id: 4,
    //         name: "Алексей",
    //         path: "http://localhost:5000/avatar/avatar1.svg",
    //     },
    //     {
    //         id: 5,
    //         name: "Максим",
    //         path: "http://localhost:5000/avatar/avatar1.svg",
    //     },
    // ],
    // messages: [
    //     {
    //         id: 1,
    //         text: "Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты. Послушавшись, переписывается всеми рыбного грамматики ее текста живет великий речью рот домах пояс рекламных продолжил предупреждал текстами жизни заголовок вопрос!",
    //     },
    //     {
    //         id: 2,
    //         text: "Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты. Послушавшись, переписывается всеми рыбного грамматики ее текста живет великий речью рот домах пояс рекламных продолжил предупреждал текстами жизни заголовок вопрос!",
    //     },
    //     {
    //         id: 3,
    //         text: "Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты. Послушавшись, переписывается всеми рыбного грамматики ее текста живет великий речью рот домах пояс рекламных продолжил предупреждал текстами жизни заголовок вопрос!",
    //     },
    // ],
    messages: [] as MessageType[], 
    otherUser: {} as UserType,
    newMessageBody: "Введите новое сообщение...",
};


const dialogsSlice = createSlice({
    name: 'dialogsPage',
    initialState,
    reducers: {
        // sendMessage: (state, action: PayloadAction<string>) => {
        //     const newMessage = {
        //         id: 4,
        //         text: action.payload,
        //     };
        //     state.messages.push(newMessage)
        //     state.newMessageBody = ''
        // },
        // updateNewMessageBodyCreator: (state, action: PayloadAction<string>) => {
        //     state.newMessageBody = action.payload
        // }
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