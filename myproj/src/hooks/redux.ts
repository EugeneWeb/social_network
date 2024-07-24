import { TypedUseSelectorHook, useDispatch } from "react-redux"
import { AppDispatch, AppStateType } from "../redux/redux-store"
import { useSelector } from "react-redux"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

type ThunkApiConfig = {
    state: AppStateType
    dispatch: AppDispatch
}
export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>()

