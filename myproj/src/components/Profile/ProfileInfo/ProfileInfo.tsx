import s from "./ProfileInfo.module.css";
import { ProfileStatus } from "./ProfileStatus/ProfileStatus";
import { FC } from "react";
import { ProfileType, UserType } from "../../../types/types";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { addToUserChats } from "../../../redux/authReducer";
import { Link, useNavigate } from "react-router-dom";

type PropsType = {
    profile: UserType;
    userId: string | undefined;
};
export const ProfileInfo: FC<PropsType> = ({ profile, userId }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const createChatHandler = () => {
        userId && dispatch(addToUserChats(userId));
        navigate(`/messages/${userId}`);
    };
    const currentUser = useAppSelector((state) => state.auth.currentUser);
    const alreadyInChats = currentUser?.chats.some((chat) => chat === userId);
    return (
        <div>
            <div className={s.bg}>
                <img src={profile.backgroundUrl} alt="Картинка обоев" />
            </div>

            <div className={s.info}>
                <div>
                    <div className={s.avatar__wrap}>
                        <img src={profile.photoUrl} alt="Аватарка" />
                    </div>
                    {userId && (
                        <>
                            {!alreadyInChats ? (
                                <Button
                                    type="primary"
                                    onClick={createChatHandler}
                                >
                                    Написать сообщение
                                </Button>
                            ) : (
                                <Link to={`/messages/${userId}`}>
                                    <Button type="primary">
                                        Открыть переписку
                                    </Button>
                                </Link>
                            )}
                        </>
                    )}
                </div>

                <div>
                    <div className={s.user__name}>{profile?.fullname}</div>

                    <ProfileStatus userId={userId} status={profile.status} />

                    <dl>
                        <div className={s.user__item}>
                            <dd>Дата рождения:</dd>
                            <dt>{profile.desc?.birthday}</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Город:</dd>
                            <dt>{profile.location?.city}</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Страна:</dd>
                            <dt>{profile.location?.country}</dt>
                        </div>
                        <div className={s.user__item}>
                            <dd>Образование:</dd>
                            <dt>{profile.desc?.education}</dt>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};
