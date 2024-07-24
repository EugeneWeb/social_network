import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Flex, Input, Row, Space } from "antd";
import Form, { Rule } from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import ru from "antd/es/calendar/locale/ru_RU";

import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { updateCurrentUser } from "../../../redux/authReducer";
import { useUpdateUserMutation } from "../../../services/PostService";
import { formatDate, removeFalsyProperties } from "../../../utils/helpers";
import { validateMessages } from "../../../utils/validate-messages";
import s from "./SettingsForm.module.css";

type SettingsFormValuesType = {
    fullname: string;

    city: string;
    country: string;

    birthday: Date;
    education: string;
};
interface SettingsFormProps {}
export const SettingsForm: FC<SettingsFormProps> = () => {
    const dispatch = useAppDispatch();
    // const loginError = useAppSelector(state => state.auth.loginError)
    // const login = (login: string, password: string) => {
    //     dispatch(loginUser({ login, password }));
    // };
    const [updateUser, { isError: isTogglePostLikesError }] =
        useUpdateUserMutation();
    const [form] = useForm();
    const navigate = useNavigate()
    

    const onFinish = async (values: SettingsFormValuesType) => {
        const notEmptyValues = removeFalsyProperties(values);
        const formattedDate = notEmptyValues?.birthday && formatDate(new Date(notEmptyValues.birthday))
        
        const updatedUser = {
            fullname: notEmptyValues?.fullname,
            location: {
                city: notEmptyValues?.city,
                country: notEmptyValues?.country,
            },
            desc: {
                birthday: formattedDate,
                education: notEmptyValues?.education
            },
        }
        await updateUser(updatedUser);
        await dispatch(updateCurrentUser(updatedUser))
        navigate('/profile')
    };

    const rules: Record<string, Rule[]> = {
        fullname: [
            {
                max: 64,
            },
        ],
        birthday: [
            {
                type: "date",
            },
        ],
        city: [
            {
                max: 256,
            },
        ],
        country: [
            {
                max: 128,
            },
        ],
    };

    const RuLocale: typeof ru = {
        ...ru,
        lang: {
            ...ru.lang,
            fieldDateFormat: "DD.MM.YYYY",
        },
    };
    // useEffect(() => {
    //     if(loginError.message) {
    //         setTimeout(() => {
    //             dispatch(clearLoginError())
    //         }, 3000)
    //     }
    // }, [loginError.message])

    return (
        <Form
            form={form}
            name="settingsForm"
            className={s.form}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <Row gutter={10} className={s.formField}>
                <Col span={18}>
                    <Form.Item<SettingsFormValuesType>
                        name="fullname"
                        rules={rules.fullname}
                        label="ФИО"
                        labelCol={{ span: 0 }}
                        noStyle
                    >
                        <Input placeholder="ФИО" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item<SettingsFormValuesType>
                        name="birthday"
                        label="Дата рождения"
                        labelCol={{ span: 0 }}
                        rules={rules.birthday}
                        noStyle
                    >
                        <DatePicker placeholder="Дата рождения" locale={RuLocale} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item<SettingsFormValuesType>
                name="city"
                rules={rules.city}
                label="Город"
                labelCol={{ span: 0 }}
            >
                <Input placeholder="Город" />
            </Form.Item>
            <Form.Item<SettingsFormValuesType>
                name="country"
                rules={rules.country}
                label="Страна"
                labelCol={{ span: 0 }}
            >
                <Input placeholder="Страна" />
            </Form.Item>
            <Form.Item<SettingsFormValuesType>
                name="education"
                label="Образование"
                labelCol={{ span: 0 }}
            >
                <Input placeholder="Образование" />
            </Form.Item>

            <Flex justify="end">
                <Form.Item noStyle>
                    <Button htmlType="submit" type="primary">
                        Изменить
                    </Button>
                </Form.Item>
            </Flex>
        </Form>
    );
};
