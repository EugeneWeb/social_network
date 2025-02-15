import { useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { FC } from "react";

import s from "./Dialogs.module.css";
import { DialogsItem } from "./DialogsItem/DialogsItem";
import { Message } from "./Message/Message";
import sendIcon from "./icons/send_icon.svg";
import { maxLength } from "../../utils/validators";
import { useAppSelector } from "../../hooks/redux";
import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { ChatContainer } from "./ChatContainer/ChatContainer";

type DialogsPropsType = {};
export const DialogsPage: FC<DialogsPropsType> = () => {
    return (
        <>
            <h1 className={s.dialogsPage__title}>Чаты</h1>
            <ChatContainer />
        </>
    );
};
