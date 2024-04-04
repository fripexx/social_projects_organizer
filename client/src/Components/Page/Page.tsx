import React, {FC, ReactNode} from 'react';
import classes from "./Page.module.scss";
import FooterMobile from "../FooterMobile/FooterMobile";

interface PageProps {
    children: ReactNode;
    [key: string]: any;
}

const Page: FC<PageProps> = ({children, ...pageProps}) => {
    return (
        <div className={classes.page} {...pageProps}>
            {children}
            <FooterMobile/>
        </div>
    );
};

export default Page;