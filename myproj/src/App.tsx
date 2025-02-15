import { Layout, theme } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useEffect, FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Settings from "./components/Settings/Settings";
import { Error } from "./components/Error/Error";
import { DialogsPage } from "./components/Dialogs/DialogsPage";
import { NavBar } from "./components/NavBar/NavBar";
import { LoginPage } from "./components/Login/LoginPage";
import { HeaderPage } from "./components/Header/HeaderPage";
import RegistrationPage from "./components/Registration/RegistrationPage";

import { me } from "./redux/authReducer";
import { Preloader } from "./components/common/Preloader/Preloader";
import { BreadCrumbView } from "./components/common/BreadCrumbsView/BreadCrumbView";
import { ProfilePage } from "./components/Profile/Profile";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
const UsersPage = React.lazy(() => import("./components/Users/UsersPage"));



type PropsType = {};
export const App: FC<PropsType> = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const isInitialized = useAppSelector(state => state.app.isInitialized);

    useEffect(
        () => {
            dispatch(me());
        },
        [dispatch]
    );

    if (!isInitialized) return <Preloader />;

    return (
        <Router>
            <Layout style={{minHeight: '100vh'}} >
                <HeaderPage />
                <Content style={{ padding: "0 48px"}}>
                    <BreadCrumbView />
                    <Layout
                        style={{
                            padding: "64px",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            height: "100%"
                        }}
                    >
                        {isAuth && <NavBar />}
                        <Content
                            style={isAuth ? { padding: "0 48px 0 96px" } : { height: 'calc(100vh - 377px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <div>
                                <div>
                                    <React.Suspense fallback={<Preloader />}>
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={<ProfilePage />}
                                            />
                                            <Route
                                                path="/profile"
                                                element={<ProfilePage />}
                                            />
                                            <Route
                                                path="/profile/:userId"
                                                element={<ProfilePage />}
                                            />
                                            <Route
                                                path="/messages"
                                                element={<DialogsPage />}
                                            />
                                            <Route
                                                path="/messages/:messageId"
                                                element={<DialogsPage />}
                                            />
                                            <Route
                                                path="/settings"
                                                element={<Settings />}
                                            />

                                            <Route
                                                path="/users"
                                                element={<UsersPage />}
                                            />

                                            <Route
                                                path="/login"
                                                element={<LoginPage />}
                                            />
                                            <Route
                                                path="/registration"
                                                element={<RegistrationPage />}
                                            />
                                            <Route
                                                path="*"
                                                element={<Error />}
                                            />
                                        </Routes>
                                    </React.Suspense>
                                </div>
                            </div>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    ©2024 Социальная сеть для спортсменов. Все права защищены.
                </Footer>
            </Layout>
        </Router>
    );
};
