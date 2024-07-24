import { FC, useEffect } from "react";
import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
import { compose } from "redux";

import s from "./Users.module.css";
import User from "./User/User";
import { requestUsers } from "../../redux/users-reducer";
import { UsersSearch } from "./UsersSearchForm/UsersSearch";
import { follow, unfollow } from "../../redux/authReducer";
import { objectToQueryString } from "../../api/api";
import { FilterType } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { WithRouter, WithRouterProps } from "../common/WithRouter/WithRouter";

type PropsType = {};
const Users: FC<PropsType & WithRouterProps> = ({location, navigate}) => {
    const {users, currentPage, perPage, filter, totalCount, isFetching } = useAppSelector(state => state.usersPage);
    const { followingInProgress } = useAppSelector(state => state.auth);
    const currentUser = useAppSelector(state => state.auth.currentUser);


    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const {
            page,
            perPage: queryPerPage,
            ...paramsObject
        } = Object.fromEntries(searchParams.entries());

        dispatch(requestUsers({perPage, currentPage: +page || 1, filter:paramsObject as FilterType}));
    }, []);
    useEffect(() => {
        navigate({
            pathname: location.pathname,
            search: objectToQueryString({
                page: currentPage,
                perPage,
                ...filter,
            }),
        });
    }, [filter, currentPage]);

    const onChangePage = (pageNum: number) => {
        dispatch(requestUsers({perPage, currentPage: pageNum, filter}));
    };
    const onFilterChange = (filter: FilterType) => {
        dispatch(requestUsers({perPage, currentPage:1, filter}));
    };

    const unfollowCallback = (userId: string) => {
        dispatch(unfollow(userId));
    };
    const followCallback = (userId: string) => {
        dispatch(follow(userId));
    };

    return (
        <div className={[(isFetching ? s.hidden : ""), s.users].join('')}>
            <UsersSearch filter={filter} onFilterChange={onFilterChange} />
            {!users.length && (
                <p className={s.noUsers}>
                    Пользователи с такими данными не найдены.
                </p>
            )}

            {!!users.length && (
                <>
                    <ul className={s.users__items}>
                        {users.map((user) => (
                            <User
                                key={user._id}
                                user={user}
                                currentUser={currentUser}
                                followingInProgress={followingInProgress}
                                unfollow={unfollowCallback}
                                follow={followCallback}
                            />
                        ))}
                    </ul>

                    <Pagination
                        total={totalCount}
                        defaultPageSize={perPage}
                        defaultCurrent={currentPage}
                        onChange={onChangePage}
                        showSizeChanger={false}
                    />
                </>
            )}
        </div>
    );
};

export default compose<React.ComponentType>(
    WithAuthRedirect,
    WithRouter<PropsType & WithRouterProps>
)(
    Users
)