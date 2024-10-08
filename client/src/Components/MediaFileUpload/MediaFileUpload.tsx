import React, {FC, useEffect, useState} from 'react';
import {v4 as uuid} from "uuid";
import {PreviewFileType} from "../PreviewFile/PreviewFile";
import plusIcon from "../../assets/images/icons/plus-icon.svg";
import Button from "../../Elements/Button/Button";
import Backdrop from "../Backdrop/Backdrop";
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

    const showAddModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAddModal(true);
    }
    const changeCallback = (addFiles: PreviewFileType[]) => {
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

            <Backdrop isOpen={addModal} clickCallback={closeCallback}>
                <ModalUploadFile
                    accept={accept}
                    maxSize={maxSize}
                    maxCountFiles={maxCountFiles}
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
            </Backdrop>
        </>
    );
};

export default MediaFileUpload;