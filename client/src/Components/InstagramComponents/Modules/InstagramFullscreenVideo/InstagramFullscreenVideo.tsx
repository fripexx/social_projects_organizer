import React, {FC, useEffect, useRef} from 'react';
import classes from "./InstagramFullscreenVideo.module.scss";
import classNames from "classnames";
import {FileType} from "../../../../store/types/FileType";
import {VideoProgressType} from "../../types/VideoProgressType";
import notFoundVideo from "../../images/not-found-video.svg"
import {ReactSVG} from "react-svg";
import VideoServer from "../../../../Elements/VideoServer/VideoServer";

interface ReelsVideoProps {
    className?: string;
    video: string | FileType | null;
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

            {video &&
                <VideoServer
                    ref={videoRef}
                    className={classes.video}
                    path={typeof video === "string" ? video : ""}
                    autoPlay={false}
                    loop={true}
                    muted={false}
                    onClick={onClick}
                />
            }

            {video === null &&
                <ReactSVG
                    className={classes.notFoundVideo}
                    src={notFoundVideo}
                />
            }

        </div>
    );
};

export default InstagramFullscreenVideo;