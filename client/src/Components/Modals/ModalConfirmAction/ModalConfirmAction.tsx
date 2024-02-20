import React, {FC} from 'react';
import classes from "./ModalConfirmAction.module.scss";
import Paragraph from "../../../Elements/Paragraph/Paragraph";
import Button from "../../../Elements/Button/Button";

interface ModalConfirmActionProps {
    text: string,
    cancelText?: string,
    confirmText?: string,
    onCancel: React.MouseEventHandler<HTMLButtonElement>,
    onConfirm: React.MouseEventHandler<HTMLButtonElement>,
}

const ModalConfirmAction:FC<ModalConfirmActionProps> = ({text, onCancel, onConfirm, cancelText, confirmText}) => {
    return (
        <div className={classes.container}>

            <Paragraph className={classes.text}>
                {text}
            </Paragraph>

            <footer className={classes.footer}>

                <Button
                    text={cancelText ? cancelText : "Ні"}
                    onClick={onCancel}
                    buttonColor={"var(--Color-Light-Grey-Blue)"}
                    textColor={"var(--Color-Dark)"}

                />

                <Button
                    text={confirmText ? confirmText : "Так"}
                    onClick={onConfirm}
                />

            </footer>

        </div>
    );
};

export default ModalConfirmAction;