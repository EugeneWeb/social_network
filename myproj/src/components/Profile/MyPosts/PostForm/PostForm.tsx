import { Avatar, Button, Col, Flex, Form, Input, Row, FormProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC, useState } from "react";

interface PostFormProps {
    photoUrl: string;
    addPost: (postText: string) => void
}
type PostFormValuesType = {
    postText: string;
};
export const PostForm: FC<PostFormProps> = ({ addPost, photoUrl }) => {
    const [isFocus, setIsFocus] = useState(false)
    const [form] = useForm()

    const onPostFocus = () => {
      setIsFocus(true)
    }
    const onPostBlur = () => {
      setTimeout(() => setIsFocus(false), 100)
    }

    const onFinish: FormProps<PostFormValuesType>["onFinish"] = async ({postText}) => {
        await addPost(postText)
        form.resetFields()
    }

    return (
        <Form
            style={{ maxWidth: 500 }}
            name="post"
            onFinish={onFinish}
            autoComplete="off"
            onBlur={onPostBlur}
            form={form}
        >
            <Row gutter={[6, 12]} align="middle">
                <Col span={24}>
                    <Form.Item<PostFormValuesType>
                        name="postText"
                        noStyle
                    >
                        <Input
                            prefix={<Avatar src={photoUrl} alt="user avatar" />}
                            placeholder="Что у вас нового?"
                            onFocus={onPostFocus}
                            
                        />
                    </Form.Item>
                </Col>

                {isFocus && <Col span={24}>
                    <Flex justify="end">
                        <Form.Item noStyle>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Опубликовать
                            </Button>
                        </Form.Item>
                    </Flex>
                </Col>}
            </Row>
        </Form>
    );
};


