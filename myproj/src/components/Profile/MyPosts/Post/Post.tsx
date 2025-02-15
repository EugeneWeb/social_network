import { FC, useEffect, useState } from "react";
import s from "./Post.module.css";
import likeIcon from "./img/like_icon.svg";
import {
    useFetchPostLikesQuery, useTogglePostLikesMutation,
} from "../../../../services/PostService";

type PropsType = {
    postId: string;
    path: string;
    text: string;
};
export const Post: FC<PropsType> = ({ path, text, postId }) => {

    const [togglePostLikes, { isError: isTogglePostLikesError, isLoading }] = useTogglePostLikesMutation();

    const { data } = useFetchPostLikesQuery(postId);

    const handleToggleLikesCount = async () => {
        try {
            const resp = await togglePostLikes(postId);
        } catch (error) {}
    };

    return (
        <div className={s.post}>
            <div className={s.img__wrap}>
                <img src={path} alt="Картинка комментария" />
            </div>

            <p className={s.text}>{text}</p>

            <div className={[s.likes, isLoading ? s.loadintLikesCount: ''].join(' ')}>
                <button
                    onClick={handleToggleLikesCount}
                    className={s.likes__icon}
                >
                    <img src={likeIcon} alt="Иконка мне нравится" />
                </button>
                <p className={s.likes__text}>{data?.likesCount}</p>
            </div>
        </div>
    );
};
