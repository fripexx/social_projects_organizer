import React, {FC, useState} from 'react';
import classes from "./InstagramStoriesPreview.module.scss";
import PhoneWrapper from "../../PhoneWrapper/PhoneWrapper";
import {FileType, PhotoType} from "../../../store/types/FileType";
import {VideoProgressType} from "../types/VideoProgressType";
import InstagramStoriesHeader from "../Modules/InstagramStoriesHeader/InstagramStoriesHeader";
import InstagramFullscreenVideo from "../Modules/InstagramFullscreenVideo/InstagramFullscreenVideo";
import InstagramStoriesFooter from "../Modules/InstagramStoriesFooter/InstagramStoriesFooter";
import {InstagramPreviewType} from "../types/InstagramPreviewType";

interface InstagramStoriesPreviewProps extends InstagramPreviewType{
    media: PhotoType | FileType,
}

const InstagramStoriesPreview:FC<InstagramStoriesPreviewProps> = ({media, profile, colabProfile, width}) => {
    const [progress, setProgress] = useState<number>(0);

    const progressCallback  = (data: VideoProgressType) => {
        const percentage = Number(((data.currentTime / data.duration) * 100).toFixed(2));
        setProgress(percentage)
    }

    return (
        <PhoneWrapper isHeaderOverlay={true} themeMode={"dark"} width={width}>

            <InstagramStoriesHeader
                className={classes.header}
                profile={profile}
                colabProfile={colabProfile}
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