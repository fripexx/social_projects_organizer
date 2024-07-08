import React, {FC} from 'react';
import classes from './ModalFooter.module.scss';
import Button from "../../../../Elements/Button/Button";

interface ModalFooterProps {
    selectMediaLength: number;
    closeButtonCallback: () => void;
    addButtonCallback: () => void;
}

const ModalFooter: FC<ModalFooterProps> = ({selectMediaLength, closeButtonCallback, addButtonCallback}) => {
    return (
        <footer className={classes.footer}>
            <Button text={"Закрити"} onClick={() => closeButtonCallback()}/>
            {selectMediaLength !== 0 && <Button text={"Додати"} onClick={() => addButtonCallback()}/>}
        </footer>
    );
};

export default ModalFooter;