import React, {FC, useEffect, useState} from 'react';
import {v4 as uuid} from "uuid";
import {PreviewFileType} from "../PreviewFile/PreviewFile";
import plusIcon from "../../assets/images/plus_icon.svg";
import Button from "../../Elements/Button/Button";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import ModalUploadFile from "../Modals/ModalUploadFile/ModalUploadFile";
import mime from "mime";

interface ModalUploadFileProps {
    maxSize?: number;
    maxCountFiles?: number;
    accept: string[],
    uploadCallback: (files: PreviewFileType[]) => void,
}

const MediaFileUpload: FC<ModalUploadFileProps> = ({maxSize = 5 * 1024 * 1024, maxCountFiles = 9, accept, uploadCallback}) => {
    const [addModal, setAddModal] = useState<boolean>(false);
    const [files, setFiles] = useState<PreviewFileType[]>([]);
    const [errors, setError] = useState<string[]>([]);

    useEffect(() => {
        if (errors.length !== 0) setTimeout(() => setError([]), 3000)
    }, [errors]);

    const showAddModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAddModal(true);
    }
    const changeCallback = (inputFiles: FileList) => {
        const addFiles: PreviewFileType[] = []

        for (let i = 0; i < inputFiles.length; i++) {
            if (i > 8) {
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

        setFiles(prevState => [...prevState, ...addFiles]);
    }
    const removeCallback = (removeId: string): void => {
        setFiles(prevState => [...prevState].filter(file => file.id !== removeId));
    }
    const closeCallback = (): void => {
        setAddModal(false);
        setFiles([]);
    }
    const confirmCallback = (): void => {
        uploadCallback(files);
        setAddModal(false);
        setFiles([]);
    }

    return (
        <>
            <Button
                text={"Додати медіафайл"}
                icon={plusIcon}
                iconColor={"var(--Color-Green)"}
                style={{marginLeft: "auto"}}
                onClick={showAddModal}
            />

            <ModalBackdrop isOpen={addModal}>
                <ModalUploadFile
                    accept={accept}
                    maxSize={maxSize}
                    maxCountFiles={maxCountFiles}
                    errors={errors}
                    files={files}
                    name={"files"}
                    multiple={true}
                    cancelText={"Закрити"}
                    confirmText={"Додати"}
                    changeCallback={changeCallback}
                    removeCallback={removeCallback}
                    closeCallback={closeCallback}
                    confirmCallback={confirmCallback}
                />
            </ModalBackdrop>
        </>

    );
};

export default MediaFileUpload;