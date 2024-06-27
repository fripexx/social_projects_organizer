import React, {FC} from 'react';
import classes from "./InstagramPublicationHeader.module.scss";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

interface InstagramPublicationHeaderProps {
    profileName: string,
    profilePicture: string | null,
    location?: string
}

const InstagramPublicationHeader: FC<InstagramPublicationHeaderProps> = ({profileName, location, profilePicture}) => {
    return (
        <div className={classes.container}>

            <div className={classes.profileInfo}>

                <ProfilePicture
                    className={classes.profilePicture}
                    src={profilePicture}
                />

                <div className={classes.textInfo}>

                    <span className={classes.profileName}>{profileName}</span>

                    {location &&
                        <span className={classes.location}>{location}</span>
                    }

                </div>

            </div>

            <svg className={classes.dots} width="15" height="4" viewBox="0 0 15 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="3" height="3" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
                <rect width="3" height="3" x="6" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
                <rect width="3" height="3" x="12" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
            </svg>

        </div>
    );
};

export default InstagramPublicationHeader;