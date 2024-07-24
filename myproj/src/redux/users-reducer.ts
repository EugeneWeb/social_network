import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AppDispatch } from "./redux-store";
import { ResultCodesEnum } from "../api/api";
import { usersAPI } from "../api/users-api";
import { UserType, FilterType, ApiItemsType } from "../types/types";
import { createAppAsyncThunk } from "../hooks/redux";

const initialState = {
    users: [] as UserType[],
    currentPage: 1,
    totalCount: 0,
    perPage: 4,
    isFetching: false,
    followingInProgress: [] as string[], //Array of users ids
    filter: {
        friend: null,
        term: null,
    } as FilterType,
};

const usersSlice = createSlice({
    name: "usersPage",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<UserType[]>) => {
            state.users = action.payload;
        },
        setUsersTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        },
        setFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestUsers.pending, (state, action) => {
                state.isFetching = true;
            })
            .addCase(requestUsers.fulfilled, (state, {payload: resp, meta: {arg}}) => {
                if (resp && resp.resultCode === ResultCodesEnum.Success) {
                    state.isFetching = false
                    
                    state.filter = arg.filter
                    state.currentPage = arg.currentPage
                    state.totalCount = resp.totalCount
                    state.users = resp.items
                }
            })
    },
});

export default usersSlice.reducer;

export const {
    setCurrentPage,
    setFilter,
    setIsFetching,
    setUsers,
    setUsersTotalCount,
} = usersSlice.actions;

type ThunkRequestUsersArguments = {
    perPage: number;
    currentPage: number;
    filter: FilterType;
};

export const requestUsers = createAppAsyncThunk<
    ApiItemsType<UserType> | undefined,
    ThunkRequestUsersArguments,
    { dispatch: AppDispatch }
>(
    "REQUEST-USERS",
    async ({ perPage, currentPage, filter }, { rejectWithValue }) => {
        try {
            const resp = await usersAPI.getUsers(perPage, currentPage, filter);
            return resp;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);


