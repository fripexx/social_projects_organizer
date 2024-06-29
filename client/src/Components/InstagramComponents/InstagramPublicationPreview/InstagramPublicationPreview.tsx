import React, {FC, RefObject, useRef, useState} from 'react';
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
import {InstagramPreviewType} from "../types/InstagramPreviewType";

interface InstagramPublicationPreviewProps extends InstagramPreviewType{
    media: (FileType | PhotoType)[],
    location?: string,
}

const InstagramPublicationPreview: FC<InstagramPublicationPreviewProps> = ({media, profile, colabProfile, location, width}) => {
    const {name, picture} = profile
    const [paginationRef, setPaginationRef] = useState<RefObject<HTMLDivElement>>()

    return (
        <PhoneWrapper width={width}>

            <InstagramHeader name={name}/>

            <InstagramPublicationHeader
                profile={profile}
                colabProfile={colabProfile}
                location={location}
            />

            {paginationRef &&
                <InstagramPictureSlider
                    media={media}
                    paginationRef={paginationRef}
                />
            }

            <div className={classes.info}>

                <InstagramPublicationButtons setRef={setPaginationRef}/>

                <InstagramLikes name={name}/>

                <InstagramComments/>

            </div>

            <InstagramFooter picture={picture}/>

        </PhoneWrapper>
    );
};

export default InstagramPublicationPreview;