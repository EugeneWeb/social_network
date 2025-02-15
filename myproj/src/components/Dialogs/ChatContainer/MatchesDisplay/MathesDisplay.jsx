import { Avatar, Flex, Space } from "antd";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { requestUsersChats } from "../../../../redux/authReducer";


import s from "./MathesDisplay.module.css";

export const MatchesDisplay = () => {
    const dispatch = useAppDispatch();
    const dialogs = useAppSelector((state) => state.auth.chats);
    useEffect(() => {
        dispatch(requestUsersChats());
    }, []);

    const { messageId } = useParams();
        
    const hasDialogs = dialogs.length > 0;

    const dialogsWrapStyles = [s.dialogsWrap, hasDialogs ? '': s.noDialogsWrap].join(' ')
    return (
        <div className={dialogsWrapStyles}>
            {hasDialogs && (
                <Flex gap={20} className={s.dialogs}>
                    {dialogs?.map((match) => (
                        <Link
                            key={match._id}
                            className={[s.dialog, match._id === messageId ? s.selectedDialog : ''].join(' ')}
                            to={`/messages/${match._id}`}
                        >
                            <Flex gap={30} justify="start" align="center">
                                <div className={s.photoWrap}><Avatar src={match.photoUrl} size={64} /></div>
                                <p className={s.fullname}>{match.fullname}</p>
                            </Flex>
                        </Link>
                    ))}
                </Flex>
            )}

            {!hasDialogs && (
                <p className={s.noDialogs}>У вас пока нет активных чатов</p>
            )}
        </div>
    );
};
