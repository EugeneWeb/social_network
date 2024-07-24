import { useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { FC } from "react";

import s from "./Dialogs.module.css";
import { DialogsItem } from "./DialogsItem/DialogsItem";
import { Message } from "./Message/Message";
import sendIcon from "./icons/send_icon.svg";
import { maxLength } from "../../utils/validators";
// import { Textarea } from "../common/FormControls/FormControls";
import { useAppSelector } from "../../hooks/redux";
// import { sendMessage } from "../../redux/dialogs-reducer";
import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { ChatContainer } from "./ChatContainer/ChatContainer";

type DialogsPropsType = {};

type MessageFormValuesType = {
    messageText: string;
};
export const DialogsPage: FC<DialogsPropsType> = () => {
    const dispatch = useDispatch();
    // const dialogs = useAppSelector(state => state.dialogsPage.dialogs)
    // const messages = useAppSelector(state => state.dialogsPage.messages)

    const onSubmit = (formData: MessageFormValuesType) => {
        // dispatch(sendMessage(formData.messageText));
    };

    return (
        <>
            <h1 className={s.dialogsPage__title}>Чаты</h1>
            <ChatContainer />
        </>

        // <div className={s.dialogs}>
        //     <ul>
        //         {dialogs.map((dialog, index) => (
        //             <DialogsItem
        //                 key={index}
        //                 id={dialog.id}
        //                 name={dialog.name}
        //                 path={dialog.path}
        //             />
        //         ))}
        //     </ul>

        //     <div className={s.messages}>
        //         <ul className={s.messages__items}>
        //             {messages.map((message, index) => (
        //                 <Message key={index} message={message.text} />
        //             ))}
        //         </ul>

        //         <MessForm />
        //         {/* <MessageReduxForm onSubmit={onSubmit} /> */}
        //     </div>
        // </div>
    );
};

// export const messageForm:React.FC<any> = ({ handleSubmit }) => {
//     const maxLength300 = maxLength(300);
//     return (
//         <form onSubmit={handleSubmit} id={s.messageForm}>
//             <Field
//                 className={s.message__input}
//                 name="messageText"
//                 elementtype="textarea"
//                 component={Textarea}
//                 validate={[maxLength300]}
//             />

//             <button type="submit" className={s.message__btn}>
//                 <img src={sendIcon} alt="Иконка отправить" />
//             </button>
//         </form>
//     );
// };

// const MessageReduxForm = reduxForm<MessageFormValuesType, {}>({ form: "message" })(messageForm);

// const MessForm: FC = () => {

//     type FieldType = {
//         username?: string;
//         password?: string;
//         remember?: string;
//       };

//       const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
//         console.log('Success:', values);
//       };

//       const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
//         console.log('Failed:', errorInfo);
//       };

//     return (
//         <Form
//     name="basic"
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     initialValues={{ remember: true }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item<FieldType>
//       label="Username"
//       name="username"
//       rules={[{ required: true, message: 'Please input your username!' }]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item<FieldType>
//       label="Password"
//       name="password"
//       rules={[{ required: true, message: 'Please input your password!' }]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item<FieldType>
//       name="remember"
//       valuePropName="checked"
//       wrapperCol={{ offset: 8, span: 16 }}
//     >
//       <Checkbox>Remember me</Checkbox>
//     </Form.Item>

//     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
//     )
// }
