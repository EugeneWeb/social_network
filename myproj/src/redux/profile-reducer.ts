import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { PostType, UserType } from "../types/types";
import { ProfileResponseDataType, profileAPI } from "../api/profile-api";
import { createAppAsyncThunk } from "../hooks/redux";
import { ResultCodesEnum } from "../api/api";



const initialState = {
    posts: [
        {
            _id: '1',
            path: `/avatar/avatar1.svg`,
            text: "Далеко-далеко, за словесными горами в стране гласных и согласных живут рыбные тексты. Всемогущая инициал даль великий свой однажды образ злых власти снова встретил залетают. Грамматики составитель, единственное вопрос несколько они текста его.",
            likesCount: 25,
        }
    ] as PostType[],
    profile: {} as UserType,
    isFetchingUser: false
};


const profileSlice = createSlice({
    name: 'profilePage',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<string>) => {
            const newPost = {
                _id: (state.posts.length + 1).toString(),
                path: `/avatar/avatar1.svg`,
                text: action.payload,
                likesCount: 25,
            };
            state.posts.push(newPost)
        },
        deletePost: (state, action: PayloadAction<string>) => {
            const postId = state.posts.findIndex(post => post._id === action.payload)
            if(postId === -1) return
            state.posts.splice(postId, 1)
        },
        setUsersProfile: (state, action: PayloadAction<UserType>) => {
            state.profile = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestProfile.pending, state => {
                state.isFetchingUser = true
            } )
            .addCase(requestProfile.fulfilled, (state, {payload: resp}) => {
                if (resp && resp.resultCode === ResultCodesEnum.Success) {
                    state.profile = resp.user
                    state.isFetchingUser = false
                }
            })
    },
})


export const requestProfile = createAppAsyncThunk<ProfileResponseDataType | undefined, string>(
    "REQUEST-PROFILE",
    async (userId, { rejectWithValue }) => {
        try {
            const profile = await profileAPI.setProfile(userId);
            return profile
        } catch (error) {
            rejectWithValue(error)
        }
    }
);

export default profileSlice.reducer

export const {addPost, deletePost, setUsersProfile} = profileSlice.actions


