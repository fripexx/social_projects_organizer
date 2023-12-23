import React, { FC, InputHTMLAttributes } from 'react';
import classes from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | boolean;
}

const Input: FC<InputProps> = ({ label, error, ...inputProps }) => {
    const classesInput: Array<string> = [classes.input];

    if(error) classesInput.push(classes.input__error);

    return (
        <div>

            <label className={classes.label}>

                {label &&
                    <span className={classes.title}>{label}</span>
                }

                <input className={classesInput.join(" ")} {...inputProps} />

            </label>

            {typeof error === 'string' &&
                <span className={classes.text_error}>
                    {error}
                </span>
            }

        </div>
    );
};

export default Input;