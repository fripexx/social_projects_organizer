import React, { FC } from 'react';
import classes from './ModalHeader.module.scss';

interface ModalHeaderProps {
    title?: string;
}

const ModalHeader: FC<ModalHeaderProps> = ({ title }) => {
    return (
        <header className={classes.header}>
            {title && <span className={classes.title}>{title}</span>}
        </header>
    );
};

export default ModalHeader;