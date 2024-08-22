import React, { FC, RefObject } from 'react';
import classes from "./InstagramPublicationButtons.module.scss";
import SwiperPagination from "../../../SwiperPagination/SwiperPagination";
import { ReactSVG } from "react-svg";
import heartIcon from "../../images/heart-icon.svg";
import commentIcon from "../../images/comment-icon.svg";
import sendIcon from "../../images/send-icon.svg";
import saveIcon from "../../images/save-icon.svg";

interface InstagramPublicationButtonsProps {
    paginationRef: RefObject<HTMLDivElement> | undefined;
}

const InstagramPublicationButtons: FC<InstagramPublicationButtonsProps> = ({ paginationRef }) => {

    return (
        <div className={classes.container}>

            <div className={classes.buttons}>
                <ReactSVG src={heartIcon} />
                <ReactSVG src={commentIcon} />
                <ReactSVG src={sendIcon} />
            </div>

            {paginationRef && (
                <SwiperPagination className={classes.pagination} ref={paginationRef} />
            )}

            <ReactSVG className={classes.saveButton} src={saveIcon} />

        </div>
    );
};

export default InstagramPublicationButtons;
