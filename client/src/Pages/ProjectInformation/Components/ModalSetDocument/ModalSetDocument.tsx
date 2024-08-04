import React, {FC, useState, useRef} from 'react';
import classes from "./ModalSetDocument.module.scss";
import Backdrop from "../../../../Components/Backdrop/Backdrop";
import Modal from "../../../../Components/Modals/Modal/Modal";
import Input from "../../../../Elements/Input/Input";
import InputFile from "../../../../Elements/InputFile/InputFile";
import Button from "../../../../Elements/Button/Button";

interface ModalSetDocumentProps {
    isOpen: boolean;
    maxFiles?: number;
    accept: string[];
    closeCallback: () => void;
    confirmCallback: (name: string, file: File) => void;
}

const ModalSetDocument: FC<ModalSetDocumentProps> = ({ isOpen, accept, closeCallback, confirmCallback, maxFiles = 1 }) => {
    const [name, setName] = useState<string>("");
    const [file, setFile] = useState<File | undefined>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    };

    const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputFiles = e.currentTarget.files;
        if (inputFiles) setFile(inputFiles[0]);
    };

    const clearFileInput = () => {
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const closeHandler = () => {
        setName("");
        setFile(undefined);
        clearFileInput();
        closeCallback();
    };

    const confirmHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (name && file) {
            confirmCallback(name, file);
            closeHandler();
        }
    };

    return (
        <Backdrop isOpen={isOpen} clickCallback={closeCallback}>
            <Modal className={classes.modal}>

                <Input
                    onChange={changeNameHandler}
                    type={"text"}
                    name={"name"}
                    label={"Назва документу"}
                    value={name}
                />

                <div className={classes.fileContainer}>

                    <span className={classes.fileLabel}>
                        Файл документу
                    </span>

                    <InputFile
                        label={"Додати файл"}
                        onChange={changeFileHandler}
                        maxLength={maxFiles}
                        accept={accept.join(", ")}
                        multiple={false}
                        ref={fileInputRef}
                    />

                    {file && <div className={classes.fileName}>{file.name}</div>}

                </div>

                <div className={classes.footer}>

                    <Button
                        text={"Закрити"}
                        onClick={closeHandler}
                        styleType={"grey-blue"}
                    />

                    <Button
                        text={"Додати"}
                        onClick={confirmHandler}
                        disabled={!(name && file)}
                    />

                </div>

            </Modal>
        </Backdrop>
    );
};

export default ModalSetDocument;
