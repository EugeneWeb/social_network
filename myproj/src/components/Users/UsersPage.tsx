import { FC } from "react";

import Users from "./Users";
import s from "./UsersPage.module.css";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { Preloader } from "../common/Preloader/Preloader";
import { useAppSelector } from "../../hooks/redux";

interface PropsType {}
export const UsersPage: FC<PropsType> = () => {
    const isFetching = useAppSelector(state => state.usersPage.isFetching)

    return (
        <div className={s.wrap}>
             <h1 className={s.users__title}>Пользователи</h1>
            {isFetching ? <Preloader /> : null}
            <Users />
        </div>
    );
}




export default WithAuthRedirect(UsersPage)
