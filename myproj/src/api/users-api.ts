
import { ApiItemsType, FilterType, MessageType, ProfileType, UserType } from "../types/types";
import {
    ErrorResponseDataType,
    PutPostResponseDataType,
    ResultCodesEnum,
    instance,
    objectToQueryString,
} from "./api";

export const usersAPI = {
    getUsers(perPage: number, currentPage: number, filter: FilterType) {
        const queryParams = {
            perPage: perPage,
            page: currentPage,
            ...filter,
        };
        return instance
            .get<ApiItemsType<UserType>>(
                `/${objectToQueryString(queryParams)}`,
                { headers: { Authorization: localStorage.getItem("token") } }
            )
            .then((resp) => {
                return resp.data;
            });
    },
    login(login: string, password: string) {
        return instance
            .post<LoginResponseDataType>("/login", { login, password })
            .then((resp) => resp.data);
    },
    registration(username: string, email: string, password: string) {
        return instance
            .post<PutPostResponseDataType>("/registration", {
                username,
                email,
                password,
            })
            .then((resp) => resp.data);
    },
    unfollow(userId: string) {
        return instance
            .delete<FollowResponseDataType>(`/unfollow/${userId}`, {
                headers: { Authorization: localStorage.getItem("token") },
            })
            .then((resp) => resp.data);
    },
    follow(userId: string) {
        return instance
            .post<FollowResponseDataType>(
                `/follow/${userId}`,
                {},
                { headers: { Authorization: localStorage.getItem("token") } }
            )
            .then((resp) => resp.data);
    },
    addToUserMatches(userId: string) {
        return instance
            .patch<{ user: UserType; resultCode: ResultCodesEnum }>(
                `/chats/${userId}`,
                {},
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
            .then((resp) => resp.data);
    },
    getUserMatches() {
        return instance
            .get<{ chats: UserType[]; resultCode: ResultCodesEnum }>(
                `/chats`,
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
            .then((resp) => {
                return resp.data});
    },
    getUserMessages(senderId: string, recipientId: string) {
        return instance
            .get<{ messages: MessageType[]; resultCode: ResultCodesEnum }>(
                `/messages?senderId=${senderId}&recipientId=${recipientId}`,
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
            .then((resp) => resp.data);
    },
    sendUsersMessage(message: string, otherUserId: string) {
        return instance
            .post<{
                message: MessageType;
                resultCode: ResultCodesEnum;
            }>(
                `/messages/${otherUserId}`,
                {
                    message,
                },
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
            .then((resp) => resp.data);
    },
    getUser(otherUserId: string) {
        return instance
            .get<{ user: UserType; resultCode: ResultCodesEnum }>(
                `/${otherUserId}`,
                {
                    headers: { Authorization: localStorage.getItem("token") },
                }
            )
            .then((resp) => resp.data);
    },
};

export type LoginResponseDataType = {
    token: string;
    user: ProfileType;
    resultCode: ResultCodesEnum;
} & ErrorResponseDataType;

export type FollowResponseDataType = {
    resultCode: ResultCodesEnum;
};
