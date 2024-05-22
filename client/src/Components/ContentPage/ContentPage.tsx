import React, {FC, HTMLAttributes, ReactNode} from 'react';
import classes from "./ContentPage.module.scss";

interface ContentPageProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode;
    [key: string]: any;
}

const ContentPage:FC<ContentPageProps> = ({children, ...contentPageProps}) => {
    return (
        <div className={classes.container} {...contentPageProps}>
            {children}
        </div>
    );
};

export default ContentPage;