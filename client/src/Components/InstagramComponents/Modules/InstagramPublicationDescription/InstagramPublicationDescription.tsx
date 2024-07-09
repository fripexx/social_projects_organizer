import React, {FC} from 'react';
import classes from "./InstagramPublicationDescription.module.scss";
import {ProfileType} from "../../types/ProfileType";

interface InstagramPublicationDescriptionProps {
    profile: ProfileType;
    description: string;
}

const InstagramPublicationDescription:FC<InstagramPublicationDescriptionProps> = ({profile, description}) => {
    return (
        <div className={classes.container}>

            <strong className={classes.profileName}>
                {profile.name}
            </strong>

            {description}

        </div>
    );
};

export default InstagramPublicationDescription;