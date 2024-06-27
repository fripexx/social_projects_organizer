import React, {FC, ReactNode} from 'react';
import classes from "./Content.module.scss";
import classNames from "classnames";

interface ContentProps {
    children: ReactNode,
    className?: string,
    [key: string]: any,
}

const Content:FC<ContentProps> = ({children, className, rest}) => {
    return (
        <div className={classNames(classes.content, className)} {...rest}>
            {children}
        </div>
    );
};

export default Content;