import React, {FC, ReactNode, useEffect, useRef, useState} from 'react';
import classes from "./ModalBackdrop.module.scss";

interface ModalBackdropProps {
    children: ReactNode,
    isOpen: boolean,
    clickCallback?: () => void
}

const ModalBackdrop:FC<ModalBackdropProps> = ({children, isOpen, clickCallback}) => {
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

export default ModalBackdrop;