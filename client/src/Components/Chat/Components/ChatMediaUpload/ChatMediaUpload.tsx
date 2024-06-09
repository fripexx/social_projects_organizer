import React, {FC, useState} from 'react';
import Backdrop from "../../../Backdrop/Backdrop";
import ModalUploadFile from "../../../Modals/ModalUploadFile/ModalUploadFile";
import classes from "../../Chat.module.scss";
import {PreviewFileType} from "../../../PreviewFile/PreviewFile";
import {v4 as uuid} from "uuid";

interface ChatMediaUploadProps {
    show: boolean,
    hideCallback: () => void
}

const ChatMediaUpload:FC<ChatMediaUploadProps> = ({show, hideCallback}) => {
    const [files, setFiles] = useState<PreviewFileType[]>([]);

    return (
        <div>
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
                    removeCallback={()=> {}}
                    closeCallback={hideCallback}
                    confirmCallback={() => {}}
                    changeCallback={() => {}}
                    errorCallback={() => {}}
                    maxSize={5 * 1024 * 1024}
                    maxCountFiles={5}
                    multiple={true}
                />
            </Backdrop>
        </div>
    );
};

export default ChatMediaUpload;