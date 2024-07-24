import { NavLink } from "react-router-dom";
import { FC } from "react";
import { Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";

import { useAppSelector } from "../../hooks/redux";
type PropsType = {};
export const NavBar: FC<PropsType> = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Sider
            style={{ background: colorBgContainer }}
            width={200}
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={["Профиль"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
            >
                <Menu.Item key="Профиль">
                    <NavLink to="/profile">Профиль</NavLink>
                </Menu.Item>
                <Menu.Item key="Сообщения">
                    <NavLink  to="/messages">
                        Сообщения
                    </NavLink>
                </Menu.Item>
                {/* <Menu.Item key="Новости">
                    <NavLink  to="/news">
                        Новости
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="Музыка">
                    <NavLink  to="/music">
                        Музыка
                    </NavLink>
                </Menu.Item> */}
                <Menu.Item key="Поиск" >
                    <NavLink to="/users">
                        Поиск
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="Настройки" >
                    <NavLink to="/settings">
                        Настройки
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};
