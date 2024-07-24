import { Button, Col, Form, Input, Row } from "antd";
import s from "./ChatInput.module.css";
import { SendOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
// import { requestUsersMessages, sendUsersMessage } from "../../../../../redux/users-reducer";
import { useParams } from "react-router-dom";
import { sendUsersMessage } from "../../../../../redux/dialogs-reducer";

export const ChatInput = () => {
    const dispatch = useAppDispatch();
    // const currentUser = useAppSelector((state) => state.auth.currentUser);

    const [form] = useForm();
    const { messageId } = useParams();

    const onFinish = ({ message }) => {
        form.resetFields();
        dispatch(sendUsersMessage({message, otherUserId: messageId}))
    };

    return (
        <div>
            <Form form={form} onFinish={onFinish} className={s.chatInput}>
            <Row style={{width: '100%'}}>
                <Col span={15} offset={6}>
                    <Form.Item name="message" noStyle>
                        <Input className={s.txtarea} />
                    </Form.Item>
                </Col>
                <Col span={3} >
                    <Form.Item noStyle>
                        <Button htmlType="submit">
                            <SendOutlined />
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        </div>
    );
};
