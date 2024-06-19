import React, {FC, ReactNode, useRef} from 'react';
import classes from "./Backdrop.module.scss";
import classNames from 'classnames';

interface BackdropProps {
    children: ReactNode,
    isOpen: boolean,
    clickCallback?: () => void,
    className?: string,
}

const Backdrop:FC<BackdropProps> = ({children, isOpen, clickCallback, className}) => {
    const ref = useRef<HTMLDivElement>(null);

    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if(clickCallback && e.target === ref.current) clickCallback();
    }

    return (
        <div className={classNames(classes.container, className)} onClick={onClick} ref={ref} data-open={isOpen}>
            {children}
        </div>
    );
};

export default Backdrop;