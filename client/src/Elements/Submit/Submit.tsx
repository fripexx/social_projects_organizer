import React, { FC, ButtonHTMLAttributes } from 'react';
import classes from "./Submit.module.scss";

interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

const Submit: FC<SubmitProps> = ({ children, ...props }) => {
    return (
        <button className={classes.button} {...props}>
            {children}
        </button>
    );
};

export default Submit;