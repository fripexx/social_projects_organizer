import React, {FC, useState} from 'react';
import classes from "./InstagramReelsPreview.module.scss";
import {FileType} from "../../../store/types/FileType";
import {VideoProgressType} from "../types/VideoProgressType";
import PhoneWrapper from "../../PhoneWrapper/PhoneWrapper";
import InstagramFullscreenVideo from "../Modules/InstagramFullscreenVideo/InstagramFullscreenVideo";
import InstagramFooter from "../Modules/InstagramFooter/InstagramFooter";
import ReelsHeader from "../Modules/ReelsHeader/ReelsHeader";
import ReelsButtons from "../Modules/ReelsButtons/ReelsButtons";
import ProfileLabel from "../Modules/ProfileLabel/ProfileLabel";
import InstagramLikes from "../Modules/InstagramLikes/InstagramLikes";
import InstagramProgressBar from "../Modules/InstagramProgressBar/InstagramProgressBar";
import {InstagramPreviewType} from "../types/InstagramPreviewType";

interface InstagramReelsPreviewProps extends InstagramPreviewType{
    video?: FileType,
    description?: string,
}

const InstagramReelsPreview: FC<InstagramReelsPreviewProps> = ({video, profile, colabProfile, description, width}) => {
    const {name, picture} = profile;
    const [progress, setProgress] = useState<number>(0);

    const progressCallback  = (data: VideoProgressType) => {
        const percentage = Number(((data.currentTime / data.duration) * 100).toFixed(2));
        setProgress(percentage)
    }

    return (
        <PhoneWrapper isHeaderOverlay={true} themeMode={"dark"} width={width}>

            <ReelsHeader className={classes.header}/>

            <InstagramFullscreenVideo
                video={video ? video.path : null}
                progressCallback={progressCallback}
            />

            <ReelsButtons className={classes.buttons}/>

            <div className={classes.info}>

                <ProfileLabel
                    className={classes.profileLabel}
                    profile={profile}
                    colabProfile={colabProfile}
                />

                {description &&
                    <span className={classes.description}>
                        {description}
                    </span>
                }

                <InstagramLikes
                    className={classes.likes}
                    name={name}
                />

            </div>

            <InstagramFooter
                className={classes.footer}
                picture={picture}
                isFooterOverlay={true}
            />

            <InstagramProgressBar
                className={classes.progressBar}
                progress={progress}
            />

        </PhoneWrapper>
    );
};

export default InstagramReelsPreview;