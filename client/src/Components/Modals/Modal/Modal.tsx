import React, {FC, HTMLAttributes, ReactNode, useEffect, useState} from 'react';
import classes from "./Modal.module.scss";

interface ModalProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode,
    className?: string
}

const Modal: FC<ModalProps> = ({children, className}) => {
    const [classesContainer, setClasses] = useState<string[]>([classes.container]);

    useEffect(() => {
        if(className) setClasses(prevState => [...prevState, className]);
    }, [className]);

    return (
        <div className={classesContainer.join(" ")}>
            {children}
        </div>
    );
};

export default Modal;