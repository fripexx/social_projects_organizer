import React, {FC} from 'react';
import classes from "./InstagramReelsPreview.module.scss";
import {FileType} from "../../../store/types/FileType";
import pp from "../../../assets/photo_5_2024-06-27_09-33-55.jpg";
import PhoneWrapper from "../../PhoneWrapper/PhoneWrapper";
import InstagramFullscreenVideo from "../InstagramFullscreenVideo/InstagramFullscreenVideo";
import InstagramFooter from "../InstagramFooter/InstagramFooter";
import ReelsHeader from "../ReelsHeader/ReelsHeader";
import ReelsButtons from "../ReelsButtons/ReelsButtons";
import ProfileLabel from "../ProfileLabel/ProfileLabel";
import InstagramLikes from "../InstagramLikes/InstagramLikes";

interface InstagramReelsPreviewProps {
    video: string | FileType,
    profileName: string,
    profilePicture: string | null,
    colabProfileName?: string,
    colabProfilePicture?: string | null,
    description?: string,
}

const InstagramReelsPreview: FC<InstagramReelsPreviewProps> = ({video, profileName, profilePicture, description, colabProfileName, colabProfilePicture}) => {
    return (
        <PhoneWrapper isHeaderOverlay={true} themeMode={"dark"}>

            <ReelsHeader className={classes.header}/>

            <InstagramFullscreenVideo video={video}/>

            <ReelsButtons className={classes.buttons}/>

            <div className={classes.info}>

                <ProfileLabel
                    className={classes.profileLabel}
                    profileName={profileName}
                    profilePicture={profilePicture}
                    colabProfileName={colabProfileName}
                    colabProfilePicture={colabProfilePicture}
                />

                {description &&
                    <span className={classes.description}>
                        {description}
                    </span>
                }

                <InstagramLikes
                    className={classes.likes}
                    profileName={profileName}
                />

            </div>

            <InstagramFooter
                className={classes.footer}
                profilePicture={profilePicture}
                isFooterOverlay={true}
            />

        </PhoneWrapper>
    );
};

export default InstagramReelsPreview;