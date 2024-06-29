import React, {FC, useEffect, useRef} from 'react';
import classes from "./InstagramFullscreenVideo.module.scss";
import {FileType} from "../../../../store/types/FileType";
import classNames from "classnames";
import {VideoProgressType} from "../../types/VideoProgressType";

interface ReelsVideoProps {
    className?: string;
    video: string | FileType;
    progressCallback?: (data: VideoProgressType) => void
}

const InstagramFullscreenVideo: FC<ReelsVideoProps> = ({video, className, progressCallback}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const onClick = (e: React.MouseEvent<HTMLVideoElement>) => {
        e.currentTarget.paused ? e.currentTarget.play() : e.currentTarget.pause()
    }

    useEffect(() => {
        const video = videoRef.current;

        if (video && progressCallback) {
            const updateProgress = () => {
                const {currentTime, duration} = video;
                progressCallback({currentTime, duration})
            };

            video.addEventListener('timeupdate', updateProgress);

            return () => {
                video.removeEventListener('timeupdate', updateProgress);
            };
        }
    }, [videoRef]);

    return (
        <div className={classNames(classes.container, className)}>
            <video
                ref={videoRef}
                className={classes.video}
                src={typeof video === "string" ? video : ""}
                autoPlay={false}
                loop={true}
                muted={false}
                onClick={onClick}
            />
        </div>
    );
};

export default InstagramFullscreenVideo;