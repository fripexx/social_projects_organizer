import React, {FC, ReactNode, useRef} from 'react';
import classes from "./Backdrop.module.scss";

interface BackdropProps {
    children: ReactNode,
    isOpen: boolean,
    clickCallback?: () => void
}

const Backdrop:FC<BackdropProps> = ({children, isOpen, clickCallback}) => {
    const ref = useRef<HTMLDivElement>(null);

    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if(clickCallback && e.target === ref.current) clickCallback();
    }

    return (
        <div className={classes.container} onClick={onClick} ref={ref} data-open={isOpen}>
            {children}
        </div>
    );
};

export default Backdrop;