import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import classes from "./Backdrop.module.scss";

interface BackdropProps {
    children: ReactNode,
    isOpen: boolean,
    clickCallback?: () => void
}

const Backdrop:FC<BackdropProps> = ({children, isOpen, clickCallback}) => {
    const [containerClass, setContainerClass] = useState(classes.container);
    const ref = useRef<HTMLDivElement>(null);

    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if(clickCallback && e.target === ref.current) clickCallback();
    }

    useEffect(() => {
        if (isOpen) {
            setContainerClass(classes.container + ' ' + classes.containerActive);
        } else {
            setContainerClass(classes.container);
        }
    }, [isOpen]);

    return (
        <div className={containerClass} onClick={onClick} ref={ref}>
            {children}
        </div>
    );
};

export default Backdrop;