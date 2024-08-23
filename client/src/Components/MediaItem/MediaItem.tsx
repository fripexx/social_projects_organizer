import React, {FC, useEffect, useState} from 'react';
import classes from "./MediaItem.module.scss";
import {FileType, PhotoCroppedType, PhotoType} from "../../store/types/FileType";
import TypeMedia from "../TypeMedia/TypeMedia";
import deleteIcon from "../../assets/images/icons/dump-icon.svg"
import {ReactSVG} from "react-svg";
import checkIcon from "../../assets/images/icons/check-icon.svg";

interface MediaItem {
    file: FileType | PhotoType,
    deleteCallback?: (id: string) => void,
    clickCallback: (media: FileType | PhotoType) => void,
    select?: boolean,
}

const MediaItem:FC<MediaItem> = ({file, deleteCallback, clickCallback, select = false}) => {
    const {id, path, mimetype, author, type, extension, name} = file;
    const [cropped, setCropped] = useState<PhotoCroppedType>();

    const deleteHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if(deleteCallback) deleteCallback(id)
    }
    const clickHandler = (e:React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        clickCallback(file);
    }

    useEffect(() => {
        if (type === "image" && 'cropped' in file && file.cropped) setCropped(file.cropped);
    }, [file, type]);

    return (
        <div className={classes.container} data-select={select}>

            {select &&
                <div className={classes.check}>
                    <ReactSVG src={checkIcon}/>
                </div>
            }

            {deleteCallback &&
                <div className={classes.delete} onClick={deleteHandler}>
                    <img src={deleteIcon}/>
                </div>
            }

            <div className={classes.item} title={name}>

                {(type === "image" || type === "video") &&
                    <div className={classes.itemMedia} onClick={clickHandler}>

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

                    </div>
                }

                {type !== "video" && type !== "image" &&
                    <a className={classes.other} href={`${process.env.REACT_APP_API_URL}/${path}`} target={"_blank"}>
                        {name}
                    </a>
                }

            </div>

            <div className={classes.footer}>

                {type &&
                    <TypeMedia className={classes.typeIcon} type={type}/>
                }

                {type !== "video" && type !== "image" && extension &&
                    <span className={classes.extension}>.{extension}</span>
                }

            </div>

        </div>
    );
};

export default MediaItem;