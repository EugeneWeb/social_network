
import { Navigate } from "react-router-dom";
import { FC } from "react";

import { useAppSelector } from "../../hooks/redux";
import { Flex } from "antd";
import { LoginForm } from "./LoginForm/LoginForm";


type PropsType = {};
export const LoginPage: FC<PropsType> = () => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    if (isAuth) return <Navigate to="/profile" />;

    return (
        <Flex justify="center">
            <LoginForm />
        </Flex>
    );
};

