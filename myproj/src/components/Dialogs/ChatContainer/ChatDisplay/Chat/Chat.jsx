import { RollbackOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex } from "antd";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import {
    requestUser,
    requestUsersMessages,
} from "../../../../../redux/dialogs-reducer";
import s from "./Chat.module.css";
export const Chat = () => {
    const dispatch = useAppDispatch();

    const { messages, otherUser } = useAppSelector(
        (state) => state.dialogsPage
    );
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const { messageId } = useParams();

    useEffect(() => {
        if (currentUser?._id && messageId) {
            dispatch(
                requestUsersMessages({
                    currentUserId: currentUser._id,
                    otherUserId: messageId,
                })
            );
            dispatch(requestUser(messageId));
        }
    }, [currentUser?._id, messageId]);

    const getDateTime = (dateString) => {
        const date = new Date(dateString);

        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        const formattedDateTime = date.toLocaleTimeString("ru-RU", options);
        return formattedDateTime;
    };
    const hasMessages = messages.length === 0;
    return (
        <div className={s.chat}>
            {messages?.map((msgObj) => {
                const isMyMessage = msgObj.from_userId === currentUser._id;
                return (
                    <Flex gap={15} className={s.message} align="center">
                        {isMyMessage ? (
                            <Avatar
                                src={
                                    isMyMessage
                                        ? currentUser.photoUrl
                                        : otherUser?.photoUrl
                                }
                                size={64}
                            />
                        ) : (
                            <Link to={`/profile/${otherUser?._id}`}>
                                <Avatar
                                    src={
                                        isMyMessage
                                            ? currentUser.photoUrl
                                            : otherUser?.photoUrl
                                    }
                                    size={64}
                                />
                            </Link>
                        )}

                        <p className={s.message__info}>{msgObj.message}</p>
                        <p className={[s.message__info, s.fullname].join(" ")}>
                            {isMyMessage
                                ? currentUser.fullname
                                : otherUser?.fullname}
                        </p>
                        <p className={[s.message__info, s.date].join(" ")}>
                            {getDateTime(msgObj.createdAt)}
                        </p>
                    </Flex>
                );
            })}
            {hasMessages && messageId && (
                <div className={s.noMessages}>
                    У вас пока нет сообщений с данным пользователем
                </div>
            )}
            {hasMessages && !messageId && (
                <div className={s.noMessages}>Вы не выбрали чат</div>
            )}
        </div>
    );
};
