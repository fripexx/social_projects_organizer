import React, {FC, HTMLAttributes, ReactNode} from 'react';
import classes from "./Field.module.scss";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    text: string,
}

const Field:FC<FieldProps> = ({children, text}) => {
    return (
        <div className={classes.field}>
            <span className={classes.text}>
                {text}
            </span>
            {children}
        </div>
    );
};

export default Field;