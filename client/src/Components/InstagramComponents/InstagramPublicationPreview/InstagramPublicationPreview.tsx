import React, {FC, useRef} from 'react';
import {FileType, PhotoType} from "../../../store/types/FileType";
import PhoneWrapper from "../../PhoneWrapper/PhoneWrapper";
import InstagramFooter from "../InstagramFooter/InstagramFooter";
import InstagramHeader from "../InstagramHeader/InstagramHeader";
import InstagramPublicationHeader from "../InstagramPublicationHeader/InstagramPublicationHeader";
import InstagramPictureSlider from "../InstagramPictureSlider/InstagramPictureSlider";
import InstagramPublicationButtons from "../InstagramPublicationButtons/InstagramPublicationButtons";
import InstagramLikes from "../InstagramLikes/InstagramLikes";
import InstagramComments from "../InstagramComments/InstagramComments";
import classes from "./InstagramPublicationPreview.module.scss";
import {ProfileType} from "../types/ProfileType";

interface InstagramPublicationPreviewProps {
    media: (FileType | PhotoType)[],
    profile: ProfileType,
    colabProfile?: ProfileType,
    location?: string,
}

const InstagramPublicationPreview: FC<InstagramPublicationPreviewProps> = ({media, profile, colabProfile, location}) => {
    const {name, picture} = profile;
    const paginationRef = useRef<HTMLDivElement>(null);

    return (
        <PhoneWrapper>

            <InstagramHeader name={name}/>

            <InstagramPublicationHeader
                profile={profile}
                colabProfile={colabProfile}
                location={location}
            />

            <InstagramPictureSlider
                media={media}
                paginationRef={paginationRef}
            />

            <div className={classes.info}>

                <InstagramPublicationButtons
                    paginationRef={paginationRef}
                />

                <InstagramLikes name={name}/>

                <InstagramComments/>

            </div>

            <InstagramFooter picture={picture}/>

        </PhoneWrapper>
    );
};

export default InstagramPublicationPreview;