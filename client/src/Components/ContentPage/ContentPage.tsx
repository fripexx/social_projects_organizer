import React, {FC, HTMLAttributes, ReactNode} from 'react';
import classes from "./ContentPage.module.scss";
import classNames from "classnames";

interface ContentPageProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    [key: string]: any;
}

const ContentPage:FC<ContentPageProps> = ({className, children, ...contentPageProps}) => {
    return (
        <div {...contentPageProps} className={classNames(classes.container, className)}>
            {children}
        </div>
    );
};

export default ContentPage;