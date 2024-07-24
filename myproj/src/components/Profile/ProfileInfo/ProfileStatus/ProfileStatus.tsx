import Paragraph from "antd/es/typography/Paragraph";
import { requestStatus } from "../../../../redux/authReducer";
import s from "./ProfileStatus.module.css";
import { useAppDispatch } from "../../../../hooks/redux";

type PropsType = {
    status: string;
    userId: string | undefined
};
export const ProfileStatus: React.FC<PropsType> = ({ status, userId }) => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <Paragraph
                className={s.status}
                editable={!userId ? {
                    onChange: (status: string) => {
                        dispatch(requestStatus(status));
                    },
                }: undefined}
            >
                {status}
            </Paragraph>
        </div>
    );
};
