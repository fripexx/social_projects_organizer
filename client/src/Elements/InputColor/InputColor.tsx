import React, { FC, InputHTMLAttributes } from 'react';
import classes from "./InputColor.module.scss";

interface InputColorProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    error?: string | boolean,
    label?: string,
}

type InputColorType = InputColorProps & { type?: 'color' };

const InputColor: FC<InputColorType> = ({ label, error, ...rest }) => {
    return (
        <div>

            <label className={classes.label}>

                {label &&
                    <span>{label}</span>
                }

                <input
                    className={classes.input}
                    type={"color"}
                    {...rest}
                    data-error={!!error}
                />

            </label>

            {typeof error === 'string' &&
                <span className={classes.error}>
                    {error}
                </span>
            }

        </div>

    );
};

export default InputColor;
