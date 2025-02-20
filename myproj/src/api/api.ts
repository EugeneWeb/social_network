import axios from "axios";

export const getToken = () => localStorage.getItem("token");

export const instance = axios.create({
    baseURL: `/api/user`,
    headers: { Authorization: getToken() },
});

export const objectToQueryString = (obj: {
    [paramName: string]: string | number | boolean | null | undefined;
}) => {
    const params = new URLSearchParams();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (!obj[key]) continue;
            params.append(key, obj[key]!.toString());
        }
    }
    return "?" + params.toString();
};

export const enum ResultCodesEnum {
    Success,
    Error,
}
export type ErrorResponseDataType = {
    message?: string;
    info?: { [propName: string]: any };
};
export type PutPostResponseDataType = {
    message: string;
    resultCode: ResultCodesEnum;
} & ErrorResponseDataType;
