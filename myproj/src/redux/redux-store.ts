import { combineReducers} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./authReducer";
import { reducer as FormReducer } from 'redux-form'
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer";
import { postAPI } from "../services/PostService";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    [postAPI.reducerPath]: postAPI.reducer,
    form: FormReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefauiltMiddleware) => {
        
        // С помощью getDefauiltMiddleware получаем все middleware'ы
        // С помощью concat добавляем middleware для сервиса
        return getDefauiltMiddleware().concat(postAPI.middleware)
    }
})

export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store