import React, {FC} from 'react';
import classes from "./InstagramPublicationHeader.module.scss";
import ProfileLabel from "../ProfileLabel/ProfileLabel";
import {ProfileType} from "../../types/ProfileType";
import {ReactSVG} from "react-svg";
import dotsIcon from "../../images/dots-icon.svg"

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

            <ReactSVG className={classes.dots} src={dotsIcon}/>

        </div>
    );
};

export default InstagramPublicationHeader;