import React, {FC, ReactNode} from 'react';
import classes from "./HeaderPage.module.scss";

interface HeaderPageProps {
    children: ReactNode,
    [key:string]: any,
}

const HeaderPage: FC<HeaderPageProps> = ({children, rest}) => {
    return (
        <div className={classes.container} {...rest}>
            {children}
        </div>
    );
};

export default HeaderPage;