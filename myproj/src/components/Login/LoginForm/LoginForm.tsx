import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Rule } from "antd/es/form";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { loginUser, clearLoginError } from "../../../redux/authReducer";
import { validateMessages } from "../../../utils/validate-messages";

import s from "./LoginForm.module.css";

type LoginFormValuesType = {
    login: string;
    password: string;
};
interface LoginFormProps {}
export const LoginForm: FC<LoginFormProps> = () => {
    const dispatch = useAppDispatch();
    const loginError = useAppSelector(state => state.auth.loginError)
    const login = (login: string, password: string) => {
        dispatch(loginUser({ login, password }));
    };

    const onFinish = (values: LoginFormValuesType) => {
        login(values.login, values.password);
    };

    const rules: Record<string, Rule[]> = {
        login: [
            {
                required: true,
                max: 319,
            },
        ],
        password: [
            {
                required: true,
                min: 8,
                max: 32,
            },
        ],
    };

    useEffect(() => {
        if(loginError.message) {
            setTimeout(() => {
                dispatch(clearLoginError()) 
            }, 3000)
        }
    }, [loginError.message])

    return (
        <Form
            name="loginForm"
            className={s.form}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <Title className={s.loginTitle} level={3}>
                Авторизация
            </Title>
            {loginError.message && <Paragraph className={s.loginError}>{loginError.message}</Paragraph>}
            <Form.Item
                name="login"
                rules={rules.login}
                label="Логин"
                labelCol={{ span: 0 }}
            >
                <Input
                    className={s.loginInput}
                    prefix={<UserOutlined />}
                    placeholder="Имя пользователя или E-mail"
                    autoComplete="email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={rules.password}
                label="Пароль"
                labelCol={{ span: 0 }}
            >
                <Input
                    className={s.loginInput}
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Пароль"
                    autoComplete="current-password"
                />
            </Form.Item>

            <Form.Item>
                <button type="submit" className={s.loginBtn}>
                    Авторизоваться
                </button>
            </Form.Item>
        </Form>
    );
};
