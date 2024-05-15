import React, {FC, HTMLAttributes} from 'react';
import classes from "./PreviewFile.module.scss";
import iconPhoto from "../../assets/images/icon_photo.svg";
import iconVideo from "../../assets/images/icon_video.svg";
import iconDocument from "../../assets/images/icon_document.svg";
import TypeMedia from "../TypeMedia/TypeMedia";

export interface PreviewFileType {
    id: string;
    typeMedia: "video" | "image" | "text" | "application" | null,
    urlSrc: string,
    fileExtension: string | null,
    fileBlob: File
}

interface PreviewFileProps extends HTMLAttributes<HTMLDivElement> {
    file: PreviewFileType,
    removeCallback: (removeId: string) => void
}

const PreviewFile:FC<PreviewFileProps> = ({file, removeCallback}) => {
    const {id, typeMedia, fileExtension, urlSrc, fileBlob} = file
    const onRemove = (e:React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        removeCallback(id);
    }

    return (
        <div className={classes.container}>

            <div className={classes.close} onClick={onRemove}>
                <svg width="10px" height="10px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 0L0 15M0 0L15 15" stroke="var(--Color-White)" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>

            <div className={classes.item} title={fileBlob.name}>

                {file?.typeMedia === "video" &&
                    <video
                        className={classes.video}
                        width={"100px"}
                        height={"100px"}
                        src={urlSrc}
                    />
                }

                {typeMedia === "image" &&
                    <img
                        className={classes.image}
                        src={urlSrc}
                        width={"100px"}
                        height={"100px"}
                        alt="image"
                    />
                }

                {(typeMedia !== "video" && typeMedia !== "image") &&
                    <span className={classes.nameFileExtension}>
                        .{fileExtension}
                    </span>
                }

                {typeMedia &&
                    <TypeMedia className={classes.typeIcon} type={typeMedia}/>
                }

            </div>

        </div>
    );
};

export default PreviewFile;