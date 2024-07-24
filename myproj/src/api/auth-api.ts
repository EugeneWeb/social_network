
import { ProfileType } from "../types/types";
import { ErrorResponseDataType, ResultCodesEnum, instance } from "./api";


export const authAPI = {
    
    me() {
        return instance
            .post<AuthResponseDataType>("/auth", {},
            {headers: { Authorization: localStorage.getItem("token")}})
            .then((resp) =>{return resp.data});
    },
};


export type AuthResponseDataType = {
    user: ProfileType;
    resultCode: ResultCodesEnum;
} & ErrorResponseDataType;