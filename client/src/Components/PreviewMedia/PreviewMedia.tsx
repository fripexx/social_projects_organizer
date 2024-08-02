import React, {FC, HTMLAttributes, useEffect, useState} from 'react';
import classes from "./PreviewMedia.module.scss";

import TypeMedia from "../TypeMedia/TypeMedia";
import {FileType, PhotoCroppedType, PhotoType} from "../../store/types/FileType";
import classNames from "classnames";

interface PreviewFileProps extends HTMLAttributes<HTMLDivElement> {
    file: PhotoType | FileType;
    removeCallback: (removeId: string) => void;
    className?: string;
    readonly?: boolean;
}

const PreviewMedia:FC<PreviewFileProps> = ({file, removeCallback, className, readonly = false}) => {
    const {id, name, type, path, extension, mimetype} = file
    const [cropped, setCropped] = useState<PhotoCroppedType>();

    const onRemove = (e:React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        removeCallback(id);
    }

    useEffect(() => {
        if (type === "image" && 'cropped' in file && file.cropped) setCropped(file.cropped);
    }, [file, type]);

    return (
        <div className={classNames(classes.container, className)}>

            {!readonly &&
                <div className={classes.close} onClick={onRemove}>
                    <svg width="10px" height="10px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 0L0 15M0 0L15 15" stroke="var(--Color-White)" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
            }

            <div className={classes.item} title={name}>

                {file?.type === "video" &&
                    <video
                        className={classes.video}
                        width={"100px"}
                        height={"100px"}
                        src={`${process.env.REACT_APP_API_URL}/${path}`}
                    />
                }

                {type === "image" &&
                    <img
                        className={classes.image}
                        src={`${process.env.REACT_APP_API_URL}/${cropped ? cropped['300'] : path}`}
                        width={"100px"}
                        height={"100px"}
                        alt="image"
                    />
                }

                {(type !== "video" && type !== "image") &&
                    <span className={classes.nameFileExtension}>
                        .{extension}
                    </span>
                }

                {type &&
                    <TypeMedia className={classes.typeIcon} type={type}/>
                }

            </div>

        </div>
    );
};

export default PreviewMedia;