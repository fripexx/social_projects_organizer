import React, {FC} from 'react';
import classes from "./ReelsVideo.module.scss";
import {FileType} from "../../../store/types/FileType";

interface ReelsVideoProps {
    video: string | FileType,
}

const ReelsVideo: FC<ReelsVideoProps> = ({video}) => {
    const onClick = (e: React.MouseEvent<HTMLVideoElement>) => {
        e.currentTarget.muted = !e.currentTarget.muted
    }
    return (
        <div className={classes.container}>
            <video
                className={classes.video}
                src={typeof video === "string" ? video : ""}
                autoPlay={true}
                loop={true}
                muted={true}
                onClick={onClick}
            />
        </div>
    );
};

export default ReelsVideo;