import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseServerUrl } from "../utils/baseUrl";

interface IPost {
    _id: string;
    text: string;
    likesCount: number;
    usersLiked: string[];
}
interface FetchPosts {
    items: IPost[];
    totalCount: number;
    resultCode: number;
}
interface FetchPostLikesResponse {
    likesCount: number;
    resultCode: number;
}
interface TogglePostLikesResponse {
    message: string;
    likesCount: number;
    resultCode: number;
}
export interface UpdateUserArguments {
    fullname?: string;
    email?: string;

    location?: { city?: string; country?: string };

    desc?: { birthday?: string; education?: string };
}

export const postAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseServerUrl}/api/user`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");

            if (token) {
                headers.set("Authorization", token);
            }

            return headers;
        },
    }),
    tagTypes: ["Post", "PostLikes"],
    endpoints: (builder) => ({
        fetchPosts: builder.query<FetchPosts, string | undefined>({
            query: (userId) => `/posts/${userId ? userId : ""}`,
            providesTags: (result) => ["Post"],
        }),
        fetchPostLikes: builder.query<FetchPostLikesResponse, string>({
            query: (userId) => `/post/${userId}`,
            providesTags: (result) => ["PostLikes"],
        }),
        addPost: builder.mutation<{ error: string }, string>({
            query: (text) => ({
                url: "/posts",
                method: "POST",
                body: { text },
            }),
            invalidatesTags: ["Post"],
        }),
        togglePostLikes: builder.mutation<TogglePostLikesResponse, string>({
            query: (postId) => ({
                url: `/post/like/${postId}`,
                method: "POST",
            }),
            invalidatesTags: ["PostLikes"],
        }),
        
        updateUser: builder.mutation<{ error: string }, UpdateUserArguments>({
            query: (newUserInfo) => {
                return {
                    url: `/`,
                    method: "PATCH",
                    body: { ...newUserInfo },
                };
            },
        }),
    }),
});

export const {
    useAddPostMutation,
    useFetchPostsQuery,
    useFetchPostLikesQuery,
    useTogglePostLikesMutation,
    useUpdateUserMutation,
} = postAPI;
