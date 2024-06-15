import React, {FC} from 'react';
import classes from "./MessageFile.module.scss";
import {FileType, PhotoType} from "../../../../store/types/FileType";
import TypeMedia from "../../../TypeMedia/TypeMedia";

interface MessageFileProps {
    file: FileType | PhotoType,
    openHandler: (fileId: string) => void
}

const isPhotoType = (file: FileType | PhotoType): file is PhotoType => {
    return (file as PhotoType).cropped !== undefined;
}

const MessageFile:FC<MessageFileProps> = ({file, openHandler}) => {
    const {id, name, path, extension, type} = file;

    const onClick = (e:React.MouseEvent<HTMLDivElement>) => {
        if(type === "image" || type === "video") {
            openHandler(id)
        } else {
            window.open(`${process.env.REACT_APP_API_URL}/${path}`, '_blank');
        }
    }

    return (
        <div className={classes.container} title={name} onClick={onClick}>

            {isPhotoType(file) && type === "image" &&
                <img
                    className={classes.img}
                    loading={"lazy"}
                    src={`${process.env.REACT_APP_API_URL}/${file.cropped["300"]}`}
                    alt=""
                />
            }

            {!isPhotoType(file) && type === "video" &&
                <video
                    className={classes.video}
                    width={"100px"}
                    height={"100px"}
                    src={`${process.env.REACT_APP_API_URL}/${path}`}
                />
            }

            {!isPhotoType(file) && type !== "video" && type !== "image" &&
                <div className={classes.other}>
                    <span className={classes.otherName}>{name}</span>
                    <span className={classes.otherExtension}>.{extension}</span>
                </div>
            }

            <TypeMedia className={classes.typeMedia} type={type}/>

        </div>
    );
};

export default MessageFile;