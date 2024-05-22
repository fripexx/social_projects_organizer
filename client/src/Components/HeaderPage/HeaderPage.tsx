import React, {FC, ReactNode} from 'react';
import classes from "./HeaderPage.module.scss";

interface HeaderPageProps {
    children: ReactNode,
    className?: string,
    [key:string]: any,
}

const HeaderPage: FC<HeaderPageProps> = ({children, className, rest}) => {
    return (
        <div className={className ? classes.container + " " + className : classes.container} {...rest}>
            {children}
        </div>
    );
};

export default HeaderPage;