import React, {FC} from 'react';
import classes from "./ModalSelect.module.scss";
import Modal from "../Modal/Modal";
import Button from "../../../Elements/Button/Button";
import Paragraph from "../../../Elements/Paragraph/Paragraph";
import Select, {SelectOption} from "../../../Elements/Select/Select";

interface ModalSelectProps {
    text: string;
    options: SelectOption[];
    value: string;
    changeCallback: (value: string) => void;
    hideCallback: () => void;
    confirmCallback: () => void;
    cancelText?: string;
    confirmText?: string;
}

const ModalSelect: FC<ModalSelectProps> = ({text, options, value, changeCallback, hideCallback, confirmCallback, confirmText, cancelText}) => {
    return (
        <Modal className={classes.container}>

            <Paragraph className={classes.text}>
                {text}
            </Paragraph>

            <Select
                options={options}
                value={value}
                onChange={changeCallback}
                dropdownType={"relative"}
            />

            <footer className={classes.footer}>

                <Button
                    text={cancelText ? cancelText : "Ні"}
                    onClick={() => hideCallback()}
                    buttonColor={"var(--Color-Light-Grey-Blue)"}
                    textColor={"var(--Color-Dark)"}

                />

                <Button
                    text={confirmText ? confirmText : "Так"}
                    onClick={() => confirmCallback()}
                />

            </footer>

        </Modal>
    );
};

export default ModalSelect;