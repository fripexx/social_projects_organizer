import React, {FC, RefObject, useState} from 'react';
import {FileType, PhotoType} from "../../../store/types/FileType";
import PhoneWrapper from "../../PhoneWrapper/PhoneWrapper";
import InstagramFooter from "../Modules/InstagramFooter/InstagramFooter";
import InstagramHeader from "../Modules/InstagramHeader/InstagramHeader";
import InstagramPublicationHeader from "../Modules/InstagramPublicationHeader/InstagramPublicationHeader";
import InstagramPictureSlider from "../Modules/InstagramPictureSlider/InstagramPictureSlider";
import InstagramPublicationButtons from "../Modules/InstagramPublicationButtons/InstagramPublicationButtons";
import InstagramLikes from "../Modules/InstagramLikes/InstagramLikes";
import InstagramComments from "../Modules/InstagramComments/InstagramComments";
import classes from "./InstagramPublicationPreview.module.scss";
import {InstagramPreviewType} from "../types/InstagramPreviewType";

interface InstagramPublicationPreviewProps extends InstagramPreviewType{
    media: (FileType | PhotoType)[],
    location?: string,
}

const InstagramPublicationPreview: FC<InstagramPublicationPreviewProps> = ({media, profile, colabProfile, location, width, className}) => {
    const {name, picture} = profile
    const [paginationRef, setPaginationRef] = useState<RefObject<HTMLDivElement>>()

    return (
        <PhoneWrapper width={width} className={className}>

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