import React, {FC, useState} from 'react';
import Backdrop from "../../../Backdrop/Backdrop";
import ModalUploadFile from "../../../Modals/ModalUploadFile/ModalUploadFile";
import classes from "../../Chat.module.scss";
import {PreviewFileType} from "../../../PreviewFile/PreviewFile";

interface ChatMediaUploadProps {
    show: boolean,
    hideCallback: () => void,
    uploadCallback: (files: PreviewFileType[]) => void,
}

const ChatMediaUpload:FC<ChatMediaUploadProps> = ({show, hideCallback, uploadCallback}) => {
    const [files, setFiles] = useState<PreviewFileType[]>([]);

    const changeCallback = (addFiles: PreviewFileType[]) => {
        setFiles(prevState => [...prevState, ...addFiles])
    }
    const removeCallback = (removeId: string) => {
        setFiles(prevState => [...prevState].filter(file => file.id !== removeId));
    }
    const confirmCallback = () => {
        uploadCallback(files);
        setFiles([])
    }
    const closeCallback = () => {
        hideCallback();
        setFiles([])
    }

    return (
        <Backdrop isOpen={show} clickCallback={hideCallback}>
            <ModalUploadFile
                className={classes.modalFiles}
                accept={[
                    "image/png",
                    "image/jpeg",
                    "image/webp",
                    "image/svg+xml",
                    "video/mp4",
                    "video/quicktime",
                    "video/webm",
                    "text/plain",
                    "application/pdf",
                    "application/xml",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ]}
                files={files}
                removeCallback={removeCallback}
                closeCallback={closeCallback}
                confirmCallback={confirmCallback}
                changeCallback={changeCallback}
                maxSize={5 * 1024 * 1024}
                maxCountFiles={5}
                multiple={true}
                cancelText={"Закрити"}
                confirmText={"Додати до повідомлення"}
            />
        </Backdrop>
    );
};

export default ChatMediaUpload;