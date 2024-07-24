import s from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { maxLength } from "../../../utils/validators";
// import { Textarea } from "../../common/FormControls/FormControls";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
    Avatar,
    Button,
    Checkbox,
    Col,
    Flex,
    Form,
    FormProps,
    Image,
    Input,
    Row,
} from "antd";
import { FC, useState } from "react";
import Icon from "@ant-design/icons/lib/components/Icon";
import { useAddPostMutation, useFetchPostsQuery } from "../../../services/PostService";
import { useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { PostForm } from "./PostForm/PostForm";

type MyPostsPropsType = {
    userId: string | undefined
};
export const MyPostsPage: FC<MyPostsPropsType> = ({userId}) => {
    const {data} = useFetchPostsQuery(userId)
    const [addPost, { isError }] = useAddPostMutation();

    const {
        profile: { photoUrl },
    } = useAppSelector((state) => state.profilePage);

    const posts = data?.items
    const userHasPosts = posts && posts?.length > 0
    
    const noPostMessage = `${userId ? "Этот пользователь": "Вы"} ещё не опубликовал${userId ? "": "и"} ни одного поста.`

    return (
        <div>
            <h2 className={s.title}>Посты пользователя</h2>

            {!userId && <div className={s.post__wrap}>
                <PostForm addPost={addPost} photoUrl={photoUrl} />
            </div>}

            <ul className="posts">
                { userHasPosts ? posts.map((post, index) => {
                    return (
                    <Post
                        key={post._id}
                        path={photoUrl}
                        postId={post._id}
                        text={post.text}
                    />
                )}): 
                <p className={s.noPosts}>
                   {noPostMessage}
                </p>
                }
            </ul>
        </div>
    );
};


