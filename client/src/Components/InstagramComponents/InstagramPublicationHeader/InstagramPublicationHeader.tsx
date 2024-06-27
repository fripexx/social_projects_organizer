import React, {FC} from 'react';
import classes from "./InstagramPublicationHeader.module.scss";
import ProfileLabel from "../ProfileLabel/ProfileLabel";

interface InstagramPublicationHeaderProps {
    profileName: string,
    profilePicture: string | null,
    location?: string,
    colabProfileName?: string,
    colabProfilePicture?: string | null,
}

const InstagramPublicationHeader: FC<InstagramPublicationHeaderProps> = ({profileName, location, profilePicture, colabProfileName, colabProfilePicture}) => {
    return (
        <div className={classes.container}>

            <ProfileLabel
                profileName={profileName}
                profilePicture={profilePicture}
                colabProfileName={colabProfileName}
                colabProfilePicture={colabProfilePicture}
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