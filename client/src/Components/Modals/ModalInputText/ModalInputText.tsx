import React, {FC, useEffect, useState} from 'react';
import classes from "./ModalInputText.module.scss";
import Modal from "../Modal/Modal";
import Button from "../../../Elements/Button/Button";

interface ModalInputTextProps {
    text?: string,
    type?: "email" | "password" | "text" | "tel" | "url" | "search",
    onChangeText: React.ChangeEventHandler<HTMLInputElement>,
    cancelText?: string,
    confirmText?: string,
    placeholderText?: string,
    onCancel: React.MouseEventHandler<HTMLButtonElement>,
    onConfirm: React.MouseEventHandler<HTMLButtonElement>,
    className?: string
}

const ModalInputText:FC<ModalInputTextProps> = ({text, type, onChangeText, cancelText, confirmText, placeholderText, onCancel, onConfirm, className}) => {
    const [classesModal, setClassesModal] = useState<string[]>([classes.modal]);

    useEffect(() => {
        if(className) setClassesModal(prevState => [...prevState, className]);
    }, [className])

    return (
        <Modal className={classesModal.join(" ")}>

            <input
                type={type ? type : "text"}
                placeholder={placeholderText ? placeholderText : "Введіть текст"}
                className={classes.inputText}
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

export default ModalInputText;