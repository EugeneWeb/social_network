import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import { RegistrationForm } from "./RegistrationForm/RegistrationForm";
import { clearRegistrationError, setIsRegistered } from "../../redux/authReducer";

type RegistrationPropsType = {};

const RegistrationPage: FC<RegistrationPropsType> = () => {
    const dispatch = useAppDispatch()
    const {isRegistered} = useAppSelector((state) => state.auth);

    const navigate = useNavigate();
    useEffect(() => {
        if(isRegistered) {
            setTimeout(() => {
                navigate("/login");
            }, 1000);
            setTimeout(() => {
                dispatch(setIsRegistered(false))
            }, 2000);
        }
    }, [isRegistered])
    
    return (
        <Flex justify="center">
            {isRegistered && <Title style={{color: '#079c07'}} level={2}>Пользователь был успешно зарегистрирован</Title>}
            {!isRegistered && (
                <RegistrationForm />
            )}
        </Flex>
    );
};

export default RegistrationPage;
