import React, {FC, ReactNode} from 'react';
import classes from "./Content.module.scss";

interface ContentProps {
    children: ReactNode,
    [key: string]: any,
}

const Content:FC<ContentProps> = ({children, rest}) => {
    return (
        <div className={classes.content} {...rest}>
            {children}
        </div>
    );
};

export default Content;