import {
    Field,
    FormikErrors,
    FormikHelpers,
    FormikTouched,
    useFormik,
} from "formik";
import { FC } from "react";
import { FilterType } from "../../../types/types";
import * as yup from "yup";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

type UsersSearchProps = {
    onFilterChange: (filter: FilterType) => void;
    filter: FilterType;
};
export const UsersSearch: FC<UsersSearchProps> = ({
    onFilterChange,
    filter,
}) => {
    const validationSchema = yup.object().shape({
        term: yup.string().max(255, "Число введенных символов превышает 255"),
    });

    const formik = useFormik<FilterType>({
        onSubmit(
            values: FilterType,
            { setSubmitting }: FormikHelpers<FilterType>
        ) {
            onFilterChange(values);
            setSubmitting(false);
        },
        initialValues: {
            friend: filter.friend || "",
            term: filter.term || "",
        },
        validationSchema,
        enableReinitialize: true,
    });
    const [form] = Form.useForm();

    

    form.setFieldsValue(formik.values);
    return (
        <Row justify="center">
            <Col span={24}>
                <Form form={form} onFinish={formik.handleSubmit}>
                    <Row justify="center" gutter={0}>
                        <Col span={10}>
                            <Form.Item<FilterType>
                                name="term"
                                validateStatus={
                                    formik.errors.term && formik.touched.term
                                        ? "error"
                                        : ""
                                }
                                help={
                                    formik.errors.term && formik.touched.term
                                        ? formik.errors.term
                                        : ""
                                }
                            >
                                <Input
                                    placeholder="Введите запрос"
                                    allowClear
                                    onChange={(value) => {
                                        formik.setFieldValue(
                                            "term",
                                            value.currentTarget.value
                                        );
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item<FilterType> name="friend">
                                <Select
                                    onChange={(value) => {
                                        formik.setFieldValue("friend", value);
                                    }}
                                >
                                    <Select.Option value="">Все</Select.Option>
                                    <Select.Option value="show">
                                        Только друзья
                                    </Select.Option>
                                    <Select.Option value="noshow">
                                        Исключить друзей
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SearchOutlined />}
                            />
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};
