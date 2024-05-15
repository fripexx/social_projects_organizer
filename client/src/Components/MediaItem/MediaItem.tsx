import React, {FC, useEffect, useState} from 'react';
import classes from "./MediaItem.module.scss";
import mime from "mime";
import {FileType, PhotoCroppedType, PhotoType} from "../../store/types/FileType";
import TypeMedia from "../TypeMedia/TypeMedia";
import deleteIcon from "../../assets/images/dump_icon.svg"

interface MediaItem {
    file: FileType | PhotoType,
    userId: string,
    administratorId: string,
    deleteCallback: (id: string) => void,
    clickCallback: (media: FileType | PhotoType) => void,
}

const MediaItem:FC<MediaItem> = ({file, userId, administratorId, deleteCallback, clickCallback}) => {
    const {id, path, mimetype, author} = file;
    const [cropped, setCropped] = useState<PhotoCroppedType>();
    const [type, setType] = useState<string>()
    const [extension, setExtension] = useState<string>()

    const onDelete = (e: React.MouseEvent<HTMLDivElement>) => {
        deleteCallback(id)
    }
    const showMedia = (e:React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        clickCallback(file);
    }

    useEffect(() => {
        setType(mimetype.split("/")[0])
        const extension = mime.getExtension(mimetype)
        if(extension) setExtension(extension)
    }, [mimetype]);
    useEffect(() => {
        if (type === "image" && 'cropped' in file && file.cropped) setCropped(file.cropped);
    }, [file, type]);

    return (
        <div className={classes.container}>

            {(author === userId || userId === administratorId) &&
                <div className={classes.delete} onClick={onDelete}>
                    <img src={deleteIcon}/>
                </div>
            }

            <div className={classes.item} onClick={showMedia}>

                {type === "image" && cropped &&
                    <img
                        className={classes.img}
                        loading={"lazy"}
                        decoding={"async"}
                        width={"200px"}
                        height={"200px"}
                        src={`${process.env.REACT_APP_API_URL}/${cropped['300']}`}
                    />
                }

                {type === "video" &&
                    <video
                        className={classes.video}
                        src={`${process.env.REACT_APP_API_URL}/${path}`}
                        width={"200px"}
                        height={"200px"}
                        preload={"metadata"}
                    />
                }

                {type !== "video" && type !== "image" &&
                    <a className={classes.other} href={`${process.env.REACT_APP_API_URL}/${path}`} target={"_blank"}>
                        {extension &&
                            <span className={classes.extension}>.{extension}</span>
                        }
                    </a>
                }

            </div>

            {type &&
                <TypeMedia className={classes.typeIcon} type={type}/>
            }

        </div>
    );
};

export default MediaItem;