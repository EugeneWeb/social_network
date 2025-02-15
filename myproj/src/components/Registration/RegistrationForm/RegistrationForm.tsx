import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { FC, useEffect } from "react";

import s from "./RegistrationForm.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { clearRegistrationError, userRegistration } from "../../../redux/authReducer";
import { validateMessages } from "../../../utils/validate-messages";
import { Rule } from "antd/es/form";
import Paragraph from "antd/es/typography/Paragraph";

interface RegistrationFormProps {}
type RegistrationFormValuesType = {
    username: string;
    email: string;
    password: string;
};
export const RegistrationForm: FC<RegistrationFormProps> = () => {
    const dispatch = useAppDispatch();
    const registrationError = useAppSelector(state => state.auth.registrationError)

    useEffect(() => {
        if(registrationError.message) {
            setTimeout(() => {
                dispatch(clearRegistrationError())
            }, 3000);
        }
    }, [registrationError.message])
    
    const registration = (
        username: string,
        email: string,
        password: string
    ) => {
        try {
            dispatch(userRegistration({ username, email, password }));
        } catch (error) {
            console.log(error);
        }
    };

    const onFinish = (values: RegistrationFormValuesType) => {
        registration(values.username, values.email, values.password);
    };

    const rules: Record<string, Rule[]> = {
        username: [
            {
                required: true,
                
                max: 64
            },
        ],
        email: [
            {
                required: true,
                type: "email",
                max: 319
            },
        ],
        password: [
            {
                required: true,
                min: 8,
                max: 32
            },
        ],
    };

    return (
        <Form name="registration" className={s.form} onFinish={onFinish} validateMessages={validateMessages}>
            <Title className={s.registrationTitle} level={3}>
                Регистрация
            </Title>
            {registrationError.message && <Paragraph className={s.registrationError}>{registrationError.message}</Paragraph>}
            <Form.Item
                name="username"
                label="Имя пользователя"
                labelCol={{span: 0}}
                rules={rules.username}
            >
                <Input
                    className={s.registrationInput}
                    prefix={<UserOutlined />}
                    placeholder="Имя пользователя"
                    autoComplete="username"
                />
            </Form.Item>
            <Form.Item
                name="email"
                rules={rules.email}
            >
                <Input
                    className={s.registrationInput}
                    prefix={<MailOutlined />}
                    placeholder="E-mail"
                    autoComplete="email"
                />
            </Form.Item>
            <Form.Item
                name="password"
                label="Пароль"
                labelCol={{span: 0}}
                rules={rules.password}
            >
                <Input
                    className={s.registrationInput}
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Пароль"
                    autoComplete="new-password"
                />
            </Form.Item>

            <Form.Item>
                <button type="submit" className={s.registrationBtn}>
                    Зарегистрироваться
                </button>
            </Form.Item>
        </Form>
    );
};
