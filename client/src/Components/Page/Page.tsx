import React, {FC, ReactNode} from 'react';
import classes from "./Page.module.scss";

interface PageProps {
    children: ReactNode;
    [key: string]: any;
}

const Page: FC<PageProps> = ({children, ...pageProps}) => {
    return (
        <div className={classes.page} {...pageProps}>
            {children}
        </div>
    );
};

export default Page;