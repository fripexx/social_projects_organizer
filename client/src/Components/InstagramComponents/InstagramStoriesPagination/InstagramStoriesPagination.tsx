import React, {CSSProperties, FC} from 'react';
import classes from "./InstagramStoriesPagination.module.scss";
import classNames from "classnames";

interface InstagramStoriesPaginationProps {
    className?: string;
    style?: CSSProperties;
    progress?: number
}

const InstagramStoriesPagination:FC<InstagramStoriesPaginationProps> = ({className, style, progress = 30}) => {
    return (
        <div className={classNames(classes.container, className)} style={style}>

            <span className={classes.item}/>
            <span className={classes.item}/>

            <div className={classes.currentItem}>
                <div className={classes.loader} style={{width: `${progress}%`}} />
            </div>

        </div>
    );
};

export default InstagramStoriesPagination;