import React, { FC, InputHTMLAttributes } from 'react';
import classes from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: FC<InputProps> = ({ label, ...inputProps }) => {
    return (
        <label className={classes.label}>
            {label &&
                <span className={classes.title}>{label}</span>
            }
            <input className={classes.input} {...inputProps} />
        </label>
    );
};

export default Input;