import React, {FC, ReactNode, useEffect, useState} from 'react';
import classes from "./ModalBackdrop.module.scss";

interface ModalBackdropProps {
    children: ReactNode,
    isOpen: boolean,
}

const ModalBackdrop:FC<ModalBackdropProps> = ({children, isOpen}) => {
    const [containerClass, setContainerClass] = useState(classes.container);

    useEffect(() => {
        if (isOpen) {
            setContainerClass(classes.container + ' ' + classes.containerActive);
        } else {
            setContainerClass(classes.container);
        }
    }, [isOpen]);

    return (
        <div className={containerClass}>
            {children}
        </div>
    );
};

export default ModalBackdrop;