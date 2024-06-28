import React, {FC, useState} from 'react';
import classes from "./InstagramStoriesPreview.module.scss";
import PhoneWrapper from "../../PhoneWrapper/PhoneWrapper";
import {FileType, PhotoType} from "../../../store/types/FileType";
import InstagramStoriesHeader from "../InstagramStoriesHeader/InstagramStoriesHeader";
import InstagramFullscreenVideo from "../InstagramFullscreenVideo/InstagramFullscreenVideo";
import InstagramStoriesFooter from "../InstagramStoriesFooter/InstagramStoriesFooter";
import {VideoProgressType} from "../types/VideoProgressType";

interface InstagramStoriesPreviewProps {
    media: PhotoType | FileType,
    profileName: string,
    profilePicture: string | null,
    colabProfileName?: string,
    colabProfilePicture?: string | null,
}

const InstagramStoriesPreview:FC<InstagramStoriesPreviewProps> = ({media, profileName, profilePicture, colabProfileName, colabProfilePicture}) => {
    const [progress, setProgress] = useState<number>(0);

    const progressCallback  = (data: VideoProgressType) => {
        const percentage = Number(((data.currentTime / data.duration) * 100).toFixed(2));
        setProgress(percentage)
    }

    return (
        <PhoneWrapper isHeaderOverlay={true} themeMode={"dark"}>

            <InstagramStoriesHeader
                className={classes.header}
                profileName={profileName}
                profilePicture={profilePicture}
                colabProfileName={colabProfileName}
                colabProfilePicture={colabProfilePicture}
                progress={progress}
            />

            <div className={classes.content}>
                <InstagramFullscreenVideo
                    className={classes.video}
                    video={media.path}
                    progressCallback={progressCallback}
                />
            </div>

            <InstagramStoriesFooter className={classes.footer}/>

        </PhoneWrapper>
    );
};

export default InstagramStoriesPreview;