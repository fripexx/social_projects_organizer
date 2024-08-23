import React, {FC, useEffect, useRef, useState} from 'react';
import {v4 as uuid} from "uuid";
import classes from "./ModalUploadFile.module.scss";
import addIcon from "../../../assets/images/icons/plus-icon.svg";
import Modal from "../Modal/Modal";
import Button from "../../../Elements/Button/Button";
import PreviewFile, {PreviewFileType} from "../../PreviewFile/PreviewFile";
import Error from "../../../Elements/Error/Error";
import mime from "mime";

interface ModalUploadFileProps {
    accept: string[],
    files: PreviewFileType[],
    name?: string,
    multiple?: boolean,
    cancelText?: string,
    confirmText?: string,
    removeCallback: (removeId: string) => void,
    closeCallback: () => void,
    confirmCallback: () => void,
    changeCallback: (addFiles: PreviewFileType[]) => void,
    maxSize: number,
    maxCountFiles: number;
    className?: string,
}

const ModalUploadFile: FC<ModalUploadFileProps> = ({accept, files, name, maxSize, maxCountFiles = 9, multiple = false, cancelText, confirmText, removeCallback, closeCallback, confirmCallback, changeCallback, className}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errors, setError] = useState<string[]>([]);

    const handleImageMouseDown = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };
    const clearFileInput = () => {
        if(fileInputRef.current) fileInputRef.current.value = "";
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputFiles = e.currentTarget.files;

        if (inputFiles) {
            const addFiles: PreviewFileType[] = []

            for (let i = 0; i < inputFiles.length; i++) {
                if (i + 1 > maxCountFiles) {
                    setError(prevState => [...prevState, `Максимальна кількість файлів - ${maxCountFiles}`])
                    break;
                }

                const currentFile = inputFiles[i];
                const type = currentFile.type.split("/")[0];
                const fileExtension = mime.getExtension(currentFile.type);

                // Перевірка чи є файл вже доданим
                if (files.find(file => file.fileBlob.name === currentFile.name && file.fileBlob.size === currentFile.size && file.fileBlob.type === currentFile.type)) {
                    setError(prevState => [...prevState, `Файл "${currentFile.name}" вже доданий`])
                    continue;
                }

                if (currentFile.size > maxSize) {
                    setError(prevState => [...prevState, `Розмір файлу "${currentFile.name}" більший за ${maxSize / (1024 * 1024)}МБ`])
                    continue
                }

                addFiles.push({
                    id: uuid(),
                    typeMedia: type === "video" || type === "image" || type === "text" || type === "application" ? type : null,
                    urlSrc: URL.createObjectURL(currentFile),
                    fileExtension: fileExtension,
                    fileBlob: currentFile
                })
            }

            changeCallback(addFiles);
        }
    }
    const onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        clearFileInput();
        closeCallback();

    }
    const onConfrim = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        clearFileInput();
        confirmCallback();
    }

    useEffect(() => {
        if (errors.length !== 0) setTimeout(() => setError([]), 3000)
    }, [errors]);

    return (
        <Modal className={className ? classes.modal + " " + className : classes.modal}>

            <span className={classes.title}>
                Додайте медіафайл
            </span>

            <div className={classes.content}>

                {files.length < maxCountFiles &&
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
                        Будь ласка, зверніть увагу: можна додати до {maxCountFiles} файлів одночасно.
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
                    styleType={"grey-blue"}
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