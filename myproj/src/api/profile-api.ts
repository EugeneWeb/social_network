
import { UserType } from "../types/types";
import { ErrorResponseDataType, PutPostResponseDataType, ResultCodesEnum, instance } from "./api";


export const profileAPI = {
    setProfile(userId: string) {
        return instance
            .get<ProfileResponseDataType>("/" + userId,
            {headers: { Authorization: localStorage.getItem("token")}})
            .then((resp) => resp.data);
    },
    updateStatus(status: string) {
        return instance
            .put<PutPostResponseDataType>(
                "/status",
                { status },
                {headers: { Authorization: localStorage.getItem("token")}}
            )
            .then((resp) => resp.data);
    },
};


export type ProfileResponseDataType = {
    user: UserType;
    resultCode: ResultCodesEnum;
} & ErrorResponseDataType;