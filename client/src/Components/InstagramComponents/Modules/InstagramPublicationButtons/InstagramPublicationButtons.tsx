import React, {Dispatch, FC, RefObject, SetStateAction, useEffect, useRef} from 'react';
import classes from "./InstagramPublicationButtons.module.scss";
import SwiperPagination from "../../../SwiperPagination/SwiperPagination";
import {ReactSVG} from "react-svg";
import heartIcon from "../../images/heart-icon.svg";
import commentIcon from "../../images/comment-icon.svg";
import sendIcon from "../../images/send-icon.svg";
import saveIcon from "../../images/save-icon.svg";

interface InstagramPublicationButtons {
    setRef: Dispatch<SetStateAction<RefObject<HTMLDivElement> | undefined>>
}

const InstagramPublicationButtons:FC<InstagramPublicationButtons> = ({setRef}) => {
    const paginationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(paginationRef.current) setRef(paginationRef)
    }, [paginationRef]);

    return (
        <div className={classes.container}>

            <div className={classes.buttons}>
                <ReactSVG src={heartIcon}/>
                <ReactSVG src={commentIcon}/>
                <ReactSVG src={sendIcon}/>
            </div>

            <SwiperPagination className={classes.pagination} paginationRef={paginationRef}/>

            <ReactSVG className={classes.saveButton} src={saveIcon}/>

        </div>
    );
};

export default InstagramPublicationButtons;