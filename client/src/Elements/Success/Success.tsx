import React, {FC, ReactNode} from 'react';
import classes from "./Success.module.scss";

interface SuccessProps {
    children: ReactNode;
    [key: string]: any;
}

const Success: FC<SuccessProps> = ({children, ...inputProps}) => {
    return (
        <span className={classes.success} {...inputProps}>
            {children}
        </span>
    );
};

export default Success;