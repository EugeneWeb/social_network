import { FC, useEffect } from "react";
import { compose } from "redux";

import s from "./Profile.module.css";
import { MyPostsPage } from "./MyPosts/MyPosts";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { Preloader } from "../common/Preloader/Preloader";
import { ProfileType } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { WithRouter, WithRouterProps } from "../common/WithRouter/WithRouter";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { requestProfile, setUsersProfile } from "../../redux/profile-reducer";

type PropsType = {};
const Profile: FC<PropsType & WithRouterProps> = (props) => {
    let {profile, isFetchingUser} = useAppSelector((state) => state.profilePage);
    const { currentUser, isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const setProfile = (userId: string) => {
        dispatch(requestProfile(userId));
    };

    const setUsersProfileDispatch = (user: ProfileType | null) => {
        if (!user) return;
        dispatch(setUsersProfile(user));
    };

    const userId = props.params.userId;
    useEffect(() => {
        if (!userId) {
            setUsersProfileDispatch(currentUser);
            return;
        }
        setProfile(userId);
    }, []);
    useEffect(() => {
        setUsersProfileDispatch(currentUser);
    }, [currentUser?.status, isAuth, userId]);

    if (!profile || isFetchingUser) {
        return <Preloader />;
    }

    return (
        <div className={s.profile}>
            <ProfileInfo profile={profile} userId={userId} />
            <MyPostsPage userId={userId} />
        </div>
    );
};

export const ProfilePage = compose<React.ComponentType>(
    WithAuthRedirect,
    WithRouter<PropsType & WithRouterProps>
)(Profile);
