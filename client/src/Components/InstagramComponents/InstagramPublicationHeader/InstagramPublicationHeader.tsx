import React, {FC} from 'react';
import classes from "./InstagramPublicationHeader.module.scss";
import ProfileLabel from "../ProfileLabel/ProfileLabel";
import {ProfileType} from "../types/ProfileType";

interface InstagramPublicationHeaderProps {
    profile: ProfileType,
    colabProfile?: ProfileType,
    location?: string,
}

const InstagramPublicationHeader: FC<InstagramPublicationHeaderProps> = ({profile, colabProfile, location}) => {
    return (
        <div className={classes.container}>

            <ProfileLabel
                profile={profile}
                colabProfile={colabProfile}
                location={location}
            />

            <svg className={classes.dots} width="15" height="4" viewBox="0 0 15 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="3" height="3" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
                <rect width="3" height="3" x="6" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
                <rect width="3" height="3" x="12" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
            </svg>

        </div>
    );
};

export default InstagramPublicationHeader;