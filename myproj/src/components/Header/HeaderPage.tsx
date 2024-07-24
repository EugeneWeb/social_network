import { FC } from "react";
import { Avatar, Col, Row, Space, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import { LogoutOutlined } from "@ant-design/icons";

import { NavLink } from "react-router-dom";
import socialSvg from "./img/icons/social network_icon.svg";
import s from "./HeaderPage.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setLogout } from "../../redux/authReducer";


type PropsType = {};
export const HeaderPage: FC<PropsType> = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth);;
    const currentUser = useAppSelector(state => state.auth.currentUser);
    const dispatch = useAppDispatch();

    const setLogoutDispatch = () => {
        const isLogout = window.confirm("Вы действительно хотите выйти?")
        isLogout && dispatch(setLogout());
    };

    const { Paragraph } = Typography;

    return (
        <Header style={{ height: 128 }}>
            <Row style={{ height: 128 }} justify="space-between" align="middle">
                <Col>
                    <div className={s.logo}>
                        <NavLink to="/" className={s.logo__link}>
                            <img src={socialSvg} alt="Логотип сайта" />
                        </NavLink>
                    </div>
                </Col>
                {!isAuth ? (
                    <Col>
                        <Space size={20}>
                            
                            <NavLink
                                to="/login"
                                className={[s.login, s.header__btns].join(" ")}
                            >
                                Авторизация
                            </NavLink>
                            <NavLink
                                to="/registration"
                                className={[
                                    s.registration,
                                    s.header__btns,
                                ].join(" ")}
                            >
                                Регистрация
                            </NavLink>
                        </Space>
                    </Col>
                ) : (
                    <Col className={s.user__info}>
                        <Space size={20} align="center">
                            <NavLink
                                to="/login"
                                onClick={setLogoutDispatch}
                                className={s.close}
                            >
                                <LogoutOutlined className={s.logout} />
                            </NavLink>

                            <NavLink to="/profile">
                                <Avatar
                                    src={currentUser?.photoUrl}
                                    alt={`${currentUser?.username} аватарка`}
                                    size={48}
                                    shape="square"
                                    className={s.profileIcon}
                                />
                            </NavLink>

                            <div>
                                <Space
                                    direction="vertical"
                                    size={5}
                                    style={{ display: "flex" }}
                                >
                                    <Paragraph
                                        className={s.infoText}
                                        style={{ marginBottom: 0 }}
                                    >
                                        {currentUser?.username}
                                    </Paragraph>
                                    <Paragraph
                                        className={s.infoText}
                                        style={{ marginBottom: 0 }}
                                    >
                                        {currentUser?.email}
                                    </Paragraph>
                                </Space>
                            </div>
                        </Space>
                    </Col>
                )}
            </Row>
        </Header>
    );
};
