import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// /64fc938f63a6bc3a1aeac335

// interface FetchUser {
//     user: IUser;
//     resultCode: number;
// }
// interface FetchUsers {
//     items: IUser[];
//     totalCount: number;
//     resultCode: number;
// }

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
        baseUrl: "http://localhost:5000/api/user",
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
        // fetchUser: builder.query<FetchUser, void>({
        //     query: () => "/64fc938f63a6bc3a1aeac335",
        // }),
        // fetchUsers: builder.query<FetchUsers, void>({
        //     query: () => "/all",
        //     providesTags: (result) => ["User"],
        // }),
        // addUser: builder.mutation<{ error: string }, string | null>({
        //     query: (fullname) => ({
        //         url: "/",
        //         method: "POST",
        //         body: { fullname },
        //     }),
        //     invalidatesTags: ["User"],
        // }),
        updateUser: builder.mutation<{ error: string }, UpdateUserArguments>({
            query: (newUserInfo) => {
                return {
                    url: `/`,
                    method: "PATCH",
                    body: { ...newUserInfo },
                };
            },
            // invalidatesTags: ["User"],
        }),
        // deleteUser: builder.mutation<IUser, string>({
        //     query: (id) => ({
        //         url: `/${id}`,
        //         method: 'DELETE'
        //     }),
        //     invalidatesTags: ['User']
        // })
    }),
});

// endpoints: builder => ({
//     fetchUser: builder.query<any, number>({
//         query: (id: number) => ({
//             url: '/64fc938f63a6bc3a1aeac335',
//             params: {
//                 id
//             }
//         })
//     })
// })

export const {
    useAddPostMutation,
    useFetchPostsQuery,
    useFetchPostLikesQuery,
    useTogglePostLikesMutation,
    useUpdateUserMutation,
} = postAPI;
// export const { useAddPostMutation, useFetchPostsQuery, useTogglePostLikesMutation, useFetchPostLikesQuery } = postAPI;
