import { FC } from "react";
import { WithAuthRedirect } from "../../hoc/withAuthRedirect";
import { SettingsForm } from "./SettingsForm/SettingsForm";
import s from './Settings.module.css'

type PropsType = {};
const Settings: FC<PropsType> = () => {
    return (
        <div>
            <h1 className={s.settings__title}>Настройки</h1>
            <SettingsForm />
        </div>
    );
};

export default WithAuthRedirect(Settings);
