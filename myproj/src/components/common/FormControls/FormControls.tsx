import { FC } from "react";
import s from "./FormControls.module.css";

const FormControls: FC<any> = ({ input, meta:{touched, error}, className, ...props }) => {
    const hasError = touched && error;
    return (
        <div className={s.formControls}>
            {hasError && <p className={s.text}>{error}</p>}
            <props.elementtype {...input}
                {...props}
                className={`${className} ${hasError && s.error} ${s.element}`} />
        </div>
    );
};


export const Input:FC<any> = (props) => {
    return <FormControls {...props}/>
};
export const Textarea: FC<any> = (props) => {
    return <FormControls {...props}/>
};