import React, {FC, RefObject, useState} from 'react';
import {FileType, PhotoType} from "../../../store/types/FileType";
import PhoneWrapper from "../../PhoneWrapper/PhoneWrapper";
import InstagramFooter from "../Modules/InstagramFooter/InstagramFooter";
import InstagramHeader from "../Modules/InstagramHeader/InstagramHeader";
import InstagramPublicationHeader from "../Modules/InstagramPublicationHeader/InstagramPublicationHeader";
import InstagramPictureSlider, {AspectRatio} from "../Modules/InstagramPictureSlider/InstagramPictureSlider";
import InstagramPublicationButtons from "../Modules/InstagramPublicationButtons/InstagramPublicationButtons";
import InstagramLikes from "../Modules/InstagramLikes/InstagramLikes";
import InstagramComments from "../Modules/InstagramComments/InstagramComments";
import classes from "./InstagramPublicationPreview.module.scss";
import {InstagramPreviewType} from "../types/InstagramPreviewType";
import InstagramPublicationDescription
    from "../Modules/InstagramPublicationDescription/InstagramPublicationDescription";

interface InstagramPublicationPreviewProps extends InstagramPreviewType{
    media: (FileType | PhotoType)[];
    location?: string;
    aspectRatio?: AspectRatio;
    description?: string;
}

const InstagramPublicationPreview: FC<InstagramPublicationPreviewProps> = ({media, profile, colabProfile, location, width, className, aspectRatio, description}) => {
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
                    aspectRatio={aspectRatio}
                />
            }

            <div className={classes.info}>

                <InstagramPublicationButtons setRef={setPaginationRef}/>

                <InstagramLikes name={name}/>

                {description &&
                    <InstagramPublicationDescription
                        profile={profile}
                        description={description}
                    />
                }

                <InstagramComments/>

            </div>

            <InstagramFooter picture={picture}/>

        </PhoneWrapper>
    );
};

export default InstagramPublicationPreview;