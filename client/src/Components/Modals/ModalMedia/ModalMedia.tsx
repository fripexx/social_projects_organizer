import React, {FC, useEffect, useState} from 'react';
import {FileType, PhotoType} from "../../../store/types/FileType";
import classes from "./ModalMedia.module.scss";

interface ModalMediaProps {
    media: FileType | PhotoType,
    closeCallback: () => void,
}

const ModalMedia:FC<ModalMediaProps> = ({media, closeCallback}) => {
    const {id, path, name, mimetype} = media;
    const [type, setType] = useState<string>();

    useEffect(() => {
        setType(mimetype.split("/")[0])
    }, [mimetype])

    const hideMedia = () => {
        closeCallback()
    }
    return (
        <div className={classes.container}>

            <div className={classes.close} onClick={hideMedia}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" width="20px" viewBox="0 0 490 490">
                    <polygon
                        points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/>
                </svg>
            </div>

            {type === "image" &&
                <img
                    className={classes.image}
                    loading={"lazy"}
                    decoding={"async"}
                    src={`${process.env.REACT_APP_API_URL}/${path}`}
                />
            }
            {type === "video" &&
                <video
                    className={classes.video}
                    src={`${process.env.REACT_APP_API_URL}/${path}`}
                    autoPlay={true}
                    controls={true}
                />
            }

        </div>
    );
};

export default ModalMedia;