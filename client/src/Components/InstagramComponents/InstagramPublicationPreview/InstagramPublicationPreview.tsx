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

interface InstagramPublicationPreviewProps {
    media: (FileType | PhotoType)[],
    profileName: string,
    profilePicture: string | null,
    location?: string,
}

const InstagramPublicationPreview: FC<InstagramPublicationPreviewProps> = ({media, profileName, profilePicture, location}) => {
    const paginationRef = useRef<HTMLDivElement>(null);

    return (
        <PhoneWrapper>

            <InstagramHeader profileName={profileName}/>

            <InstagramPublicationHeader
                profileName={profileName}
                profilePicture={profilePicture}
                location={location}
            />

            <InstagramPictureSlider
                media={media}
                paginationRef={paginationRef}
            />

            <InstagramPublicationButtons
                paginationRef={paginationRef}
            />

            <InstagramLikes profileName={profileName}/>

            <InstagramComments/>

            <InstagramFooter profilePicture={profilePicture}/>

        </PhoneWrapper>
    );
};

export default InstagramPublicationPreview;