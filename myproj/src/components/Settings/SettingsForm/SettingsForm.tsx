import { Button, Col, DatePicker, DatePickerProps, Flex, Input, Row } from "antd";
import ru from "antd/es/calendar/locale/ru_RU";
import Form, { Rule } from "antd/es/form";
import { useForm } from "antd/es/form/Form";

import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
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

    const [updateUser, { isError: isTogglePostLikesError }] =
        useUpdateUserMutation();
    const [form] = useForm();
    const navigate = useNavigate();

    const defaultUser = {
        fullname: "",
        city: "",
        country: "",
        education: "",
    };

    const currentUser = useAppSelector((state) => state.auth.currentUser)

    const defaultFormValues =
       (currentUser && {
        fullname: currentUser?.fullname,
        city: currentUser?.location.city,
        country: currentUser?.location.country,
        education: currentUser?.desc.education,
       }) || defaultUser;
    useEffect(() => {
        form.setFieldsValue(defaultFormValues);
    }, []);

    const onFinish = async (values: SettingsFormValuesType) => {
        const notEmptyValues = removeFalsyProperties(values);
        const formattedDate =
            notEmptyValues?.birthday &&
            formatDate(new Date(notEmptyValues.birthday));

        const updatedUser = {
            fullname: notEmptyValues?.fullname,
            location: {
                city: notEmptyValues?.city,
                country: notEmptyValues?.country,
            },
            desc: {
                birthday: formattedDate,
                education: notEmptyValues?.education,
            },
        };
        await updateUser(updatedUser);
        await dispatch(updateCurrentUser(updatedUser));
        navigate("/profile");
    };

    const rules: Record<string, Rule[]> = {
        fullname: [
            {
                max: 64,
            },
        ],
        birthday: [
            
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

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
      };

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
                        noStyle
                    >
                        <DatePicker
                            placeholder="Дата рождения"
                            locale={RuLocale}
                        />
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
