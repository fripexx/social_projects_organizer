import React, {FC, useState} from 'react';
import classes from "./InstagramReelsPreview.module.scss";
import {FileType} from "../../../store/types/FileType";
import PhoneWrapper from "../../PhoneWrapper/PhoneWrapper";
import InstagramFullscreenVideo from "../InstagramFullscreenVideo/InstagramFullscreenVideo";
import InstagramFooter from "../InstagramFooter/InstagramFooter";
import ReelsHeader from "../ReelsHeader/ReelsHeader";
import ReelsButtons from "../ReelsButtons/ReelsButtons";
import ProfileLabel from "../ProfileLabel/ProfileLabel";
import InstagramLikes from "../InstagramLikes/InstagramLikes";
import {ProfileType} from "../types/ProfileType";
import InstagramProgressBar from "../InstagramProgressBar/InstagramProgressBar";
import {VideoProgressType} from "../types/VideoProgressType";

interface InstagramReelsPreviewProps {
    video: string | FileType,
    profile: ProfileType,
    colabProfile?: ProfileType,
    description?: string,
}

const InstagramReelsPreview: FC<InstagramReelsPreviewProps> = ({video, profile, colabProfile, description}) => {
    const {name, picture} = profile;
    const [progress, setProgress] = useState<number>(0);

    const progressCallback  = (data: VideoProgressType) => {
        const percentage = Number(((data.currentTime / data.duration) * 100).toFixed(2));
        setProgress(percentage)
    }

    return (
        <PhoneWrapper isHeaderOverlay={true} themeMode={"dark"}>

            <ReelsHeader className={classes.header}/>

            <InstagramFullscreenVideo
                video={video}
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