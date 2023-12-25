import React, {FC, ReactNode} from 'react';
import classes from "./Error.module.scss";

interface ErrorProps {
    children: ReactNode;
    [key: string]: any;
}

const Error: FC<ErrorProps> = ({children, ...inputProps}) => {
    return (
        <span className={classes.error} {...inputProps}>
            {children}
        </span>
    );
};

export default Error;