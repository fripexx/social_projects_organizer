import React, {FC, InputHTMLAttributes} from 'react';
import classes from "./Radio.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}
const Radio:FC<InputProps> = ({ label, ...inputProps }) => {
    return (
        <label className={classes.label}>

            <input className={classes.input} type={"radio"} {...inputProps} />

            {label &&
                <span className={classes.title}>{label}</span>
            }

        </label>
    );
};

export default Radio;