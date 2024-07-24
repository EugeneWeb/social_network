import { stopSubmit } from "redux-form";
import {
    PayloadAction,
    createSlice,
} from "@reduxjs/toolkit";

import { PutPostResponseDataType, ResultCodesEnum } from "../api/api";
import { MessageType, ProfileType, UserType } from "../types/types";
import { usersAPI } from "../api/users-api";
import { authAPI } from "../api/auth-api";
import { profileAPI } from "../api/profile-api";
import { setInitialized } from "./appReducer";
import { createAppAsyncThunk } from "../hooks/redux";
import { LoginResponseDataType } from "../api/users-api";
import { stat } from "fs";
import { UpdateUserArguments } from "../services/PostService";

const initialState = {
    currentUser: null as ProfileType | null,
    isAuth: false,
    isRegistered: false,
    followingInProgress: [] as string[],
    loginError: {} as AuthErrorType,
    registrationError: {} as AuthErrorType,
    chats: [] as UserType[],

};
type AuthErrorType = {
    message: string | undefined
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<ProfileType>) => {
            state.currentUser = action.payload;
            state.isAuth = true;
        },
        updateCurrentUser:(state, action: PayloadAction<UpdateUserArguments>) => {
            const {
                fullname,
                location: { city = undefined, country = undefined } = {},
                desc: { birthday = undefined, education = undefined} = {}
            } = action.payload;
            const curUser = state.currentUser

            if(curUser) {
                fullname && (curUser.fullname = fullname)
                city && (curUser.location.city = city)
                country && (curUser.location.country = country)
                birthday && (curUser.desc.birthday = birthday)
                education && (curUser.desc.education = education)
            }
            
        },
        setLogout: (state) => {
            localStorage.removeItem("token");
            state.currentUser = null;
            state.isAuth = false;
        },
        setIsRegistered: (state, action: PayloadAction<boolean>) => {
            state.isRegistered = action.payload;
        },
        togglePostLikesCount: (state, action: PayloadAction<boolean>) => {
            if(!state.currentUser) return
        },
        clearLoginError(state) {
            state.loginError = { message: ''}
        },
        clearRegistrationError(state) {
            state.registrationError = { message: ''}
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(follow.pending, (state, { meta: { arg: userId } }) => {
                state.followingInProgress.push(userId);
            })
            .addCase(
                follow.fulfilled,
                (state, { meta: { arg: userId }, payload: resultCode }) => {
                    if (resultCode === ResultCodesEnum.Success) {
                        state.currentUser?.following.push(userId);

                        const IdIndex = state.followingInProgress.findIndex(
                            (value) => value === userId
                        );
                        if (IdIndex && IdIndex === -1) return;
                        state.followingInProgress.splice(IdIndex, 1);
                    }
                }
            )
            .addCase(follow.rejected, (state, { meta: { arg: userId } }) => {
                const IdIndex = state.followingInProgress.findIndex(
                    (value) => value === userId
                );
                if (!IdIndex || IdIndex === -1) return;
                state.followingInProgress.splice(IdIndex, 1);
            })

            .addCase(unfollow.pending, (state, { meta: { arg: userId } }) => {
                state.followingInProgress.push(userId);
            })
            .addCase(
                unfollow.fulfilled,
                (state, { meta: { arg: userId }, payload: resultCode }) => {
                    if (resultCode === ResultCodesEnum.Success) {
                        const userIdIndex =
                            state.currentUser?.following.findIndex(
                                (value) => value === userId
                            );
                        if (userIdIndex === undefined || userIdIndex === -1)
                            return;
                        state.currentUser?.following.splice(userIdIndex, 1);

                        const IdIndex = state.followingInProgress.findIndex(
                            (value) => value === userId
                        );
                        if (IdIndex === -1) return;
                        state.followingInProgress.splice(IdIndex, 1);
                    }
                }
            )
            .addCase(unfollow.rejected, (state, { meta: { arg: userId } }) => {
                const IdIndex = state.followingInProgress.findIndex(
                    (value) => value === userId
                );
                if (!IdIndex || IdIndex === -1) return;
                state.followingInProgress.splice(IdIndex, 1);
            })

            .addCase(requestStatus.fulfilled, (state, {payload: resultCode, meta: { arg: status }}) => {
                if (resultCode === ResultCodesEnum.Success) {
                    if(!state.currentUser) return
                    state.currentUser.status = status
                }
            })     

            .addCase(loginUser.fulfilled, (state, {payload: resp}) => {
                if(resp?.info && resp?.info.resultCode === ResultCodesEnum.Error) {
                    state.loginError.message = resp.message
                }
            }) 
            
            
            .addCase(userRegistration.fulfilled, (state, {payload: resp}) => {
                if (resp?.resultCode === ResultCodesEnum.Success) {
                    state.isRegistered = true
                } else {
                    state.registrationError.message = resp?.message
                }
            }) 
            
            .addCase(addToUserChats.fulfilled, (state, {payload: resp}) => {
                if (resp?.resultCode === ResultCodesEnum.Success) {
                    state.chats.push(resp.user)
                    state.currentUser && state.currentUser.chats.push(resp.user._id)
                }
            })
            
            .addCase(requestUsersChats.fulfilled, (state, {payload: resp}) => {
                if(resp?.resultCode === ResultCodesEnum.Success) {
                    state.chats = resp?.chats ? [...resp?.chats] : []
                }
            })
    },
});

export default authSlice.reducer;

export const { setIsRegistered, setLogout, setUser, clearLoginError, clearRegistrationError, updateCurrentUser } =
    authSlice.actions;

type LoginUserArguments = { login: string; password: string };
export const loginUser = createAppAsyncThunk<LoginResponseDataType | undefined, LoginUserArguments>(
    "LOGIN-USER",
    async ({ login, password }, { dispatch }) => {
        try {
            const resp = await usersAPI.login(login, password);
            if (resp.resultCode === ResultCodesEnum.Success) {
                dispatch(setUser(resp.user));
                localStorage.setItem("token", resp.token);
            }
            return resp
        } catch (error) {}
    }
);

type ThunkUserRegistrationArguments = {
    username: string;
    email: string;
    password: string;
};
export const userRegistration = createAppAsyncThunk<
PutPostResponseDataType | undefined,
    ThunkUserRegistrationArguments
>("USER-REGISTRATION", async ({ username, email, password }, { dispatch }) => {
    try {
        const resp = await usersAPI.registration(username, email, password);
        return resp
    } catch (error) {}
});

export const follow = createAppAsyncThunk<ResultCodesEnum | undefined, string>(
    "FOLLOW",
    async (userId, { rejectWithValue }) => {
        try {
            const resp = await usersAPI.follow(userId);
            return resp.resultCode;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);
export const unfollow = createAppAsyncThunk<
    ResultCodesEnum | undefined,
    string
>("UNFOLLOW", async (userId, { rejectWithValue }) => {
    try {
        const resp = await usersAPI.unfollow(userId);
        return resp.resultCode;
    } catch (error) {
        rejectWithValue(error);
    }
});


export const me = createAppAsyncThunk<void, void>(
    "ME",
    async (_, { dispatch }) => {
        try {
            const resp = await authAPI.me();
            if (resp.resultCode === ResultCodesEnum.Success) {
                await dispatch(setUser(resp.user));
                dispatch(setInitialized());
            }
        } catch (error) {
            dispatch(setInitialized());
            localStorage.removeItem("token");
        }
    }
);

export const requestStatus = createAppAsyncThunk<
    ResultCodesEnum | undefined,
    string
>("REQUEST-STATUS", async (status, { rejectWithValue }) => {
    try {
        const resp = await profileAPI.updateStatus(status);
        return resp.resultCode;
    } catch (error) {
        rejectWithValue(error);
    }
});


export const addToUserChats = createAppAsyncThunk<{user: UserType, resultCode: ResultCodesEnum} | undefined, string>(
    "ADD-TO-USER-MATCHES",
    async (userId, { rejectWithValue }) => {
        try {
            const user = await usersAPI.addToUserMatches(userId);
            return user
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

export const requestUsersChats = createAppAsyncThunk<{chats: UserType[], resultCode: ResultCodesEnum} | undefined, void>(
    "REQUEST-USERS-MATCHES",
    async (_, { rejectWithValue }) => {
        try {
            const user = await usersAPI.getUserMatches();
            return user
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);


