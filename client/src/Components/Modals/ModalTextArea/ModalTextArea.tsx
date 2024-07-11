import React, {FC, useEffect, useState} from 'react';
import classes from "./ModalTextArea.module.scss";
import Modal from "../Modal/Modal";
import Button from "../../../Elements/Button/Button";

interface ModalTextAreaProps {
    text?: string,
    onChangeText: React.ChangeEventHandler<HTMLTextAreaElement>,
    cancelText?: string,
    confirmText?: string,
    onCancel: React.MouseEventHandler<HTMLButtonElement>,
    onConfirm: React.MouseEventHandler<HTMLButtonElement>,
    className?: string
}

const ModalTextArea:FC<ModalTextAreaProps> = ({text, onChangeText, cancelText, confirmText, onCancel, onConfirm, className}) => {
    const [classesModal, setClassesModal] = useState<string[]>([classes.modal]);

    useEffect(() => {
        if(className) setClassesModal(prevState => [...prevState, className]);
    }, [className])

    return (
        <Modal className={classesModal.join(" ")}>

            <textarea
                placeholder={"Введіть текст"}
                className={classes.textarea}
                value={text}
                onChange={onChangeText}
            />

            <footer className={classes.footer}>

                <Button
                    text={cancelText ? cancelText : "Закрити"}
                    onClick={onCancel}
                    styleType={"grey-blue"}
                />

                <Button
                    text={confirmText ? confirmText : "Додати"}
                    onClick={onConfirm}
                />

            </footer>
        </Modal>
    );
};

export default ModalTextArea;