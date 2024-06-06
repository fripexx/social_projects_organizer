import React, {FC, useRef} from 'react';
import {v4 as uuid} from "uuid";
import classes from "./ModalUploadFile.module.scss";
import addIcon from "../../../assets/images/plus_icon.svg";
import Modal from "../Modal/Modal";
import Button from "../../../Elements/Button/Button";
import PreviewFile, {PreviewFileType} from "../../PreviewFile/PreviewFile";
import Error from "../../../Elements/Error/Error";

interface ModalUploadFileProps {
    accept: string[],
    files: PreviewFileType[],
    name?: string,
    multiple?: boolean,
    cancelText?: string,
    confirmText?: string,
    errors?: string[],
    removeCallback: (removeId: string) => void,
    closeCallback: () => void,
    confirmCallback: () => void,
    changeCallback: (inputFiles: FileList) => void,
    maxSize: number,
    maxCountFiles: number;
    className?: string,
}

const ModalUploadFile: FC<ModalUploadFileProps> = ({accept, files, name, maxSize, maxCountFiles, multiple = false, cancelText, confirmText, removeCallback, closeCallback, confirmCallback, changeCallback, errors, className}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageMouseDown = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputFiles = e.currentTarget.files;
        if (inputFiles) changeCallback(inputFiles);
    }
    const onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        closeCallback();
    }
    const onConfrim = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        confirmCallback();
    }

    return (
        <Modal className={className ? classes.modal + " " + className : classes.modal}>

            <span className={classes.title}>
                Додайте медіафайл
            </span>

            <div className={classes.content}>

                {files.length < 9 &&
                    <div className={classes.addFile} onClick={handleImageMouseDown}>

                        <input
                            ref={fileInputRef}
                            className={classes.input}
                            type={"file"}
                            size={maxSize}
                            name={name ? name : "files"}
                            accept={accept.join(", ")}
                            onChange={onChange}
                            multiple={multiple}
                        />

                        <div className={classes.addFileButton}>

                            <img className={classes.addFileIcon} src={addIcon} alt=""/>

                        </div>

                        <span className={classes.addFileName}>Виберіть файли</span>

                    </div>
                }
                {files.length >= maxCountFiles &&
                    <span className={classes.maxFileCount}>
                        Будь ласка, зверніть увагу: можна додати до 9 файлів одночасно.
                    </span>
                }


                <div className={classes.previews}>
                {
                        files.map(file => {
                            return (
                                <PreviewFile
                                    removeCallback={removeCallback}
                                    key={file.id}
                                    file={file}
                                />
                            )
                        })
                    }
                </div>

                {errors &&
                    <div className={classes.errors}>
                        {errors.map(error => <Error key={uuid()}>{error}</Error>)}
                    </div>
                }

            </div>

            <footer className={classes.footer}>

                <Button
                    text={cancelText ? cancelText : "Ні"}
                    onClick={onClose}
                    buttonColor={"var(--Color-Light-Grey-Blue)"}
                    textColor={"var(--Color-Dark)"}

                />

                <Button
                    text={confirmText ? confirmText : "Так"}
                    onClick={onConfrim}
                    disabled={files.length === 0}
                />

            </footer>

        </Modal>
    );
};

export default ModalUploadFile;