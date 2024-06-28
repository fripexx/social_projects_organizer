import React, {CSSProperties, FC} from 'react';
import classes from "./InstagramStoriesFooter.module.scss";
import classNames from "classnames";

interface InstagramStoriesFooterProps {
    className?: string;
    style?: CSSProperties;
}

const InstagramStoriesFooter:FC<InstagramStoriesFooterProps> = ({className, style}) => {
    return (
        <div className={classNames(classes.container, className)} style={style}>

            <div className={classes.field}>
                <span>Надіслати повідомлення</span>
            </div>

            <div className={classes.buttons}>

                <svg className={classes.likeIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.314 6.18327L11.6642 5.55282C11.5296 5.42231 11.4002 5.29726 11.2744 5.17578C11.0546 4.96343 10.8461 4.76199 10.6415 4.56135C9.00072 2.95357 6.74236 2.49837 4.93299 3.2796L4.93283 3.27967C3.11907 4.06238 1.85702 6.05585 1.90111 8.28768L1.90111 8.28774C1.93442 9.97959 2.64327 11.4797 3.67634 12.964L3.67663 12.9644C5.93146 16.2077 8.99036 18.6438 12.2533 21.0297C14.6308 19.2988 16.895 17.5125 18.8503 15.3973L19.5111 16.0082L18.8503 15.3973C20.5094 13.6025 21.8746 11.787 22.4325 9.53903L22.4326 9.53879C23.0207 7.17217 22.0148 4.70661 20.1001 3.55445L12.314 6.18327ZM12.314 6.18327L12.9405 5.52965M12.314 6.18327L12.9405 5.52965M12.9405 5.52965C13.0847 5.37928 13.212 5.24118 13.3318 5.11134C13.5615 4.86215 13.7633 4.64336 14.0019 4.42661L14.0023 4.42629M12.9405 5.52965L14.0023 4.42629M14.0023 4.42629C15.8653 2.73235 18.2782 2.45884 20.1 3.55435L14.0023 4.42629Z"
                        fill="var(--Color-SVG, #FE0135)"
                        stroke="var(--Color-SVG, #FE0135)"
                        strokeWidth="1.8"
                    />
                </svg>

                <svg className={classes.sendIcon} width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 108.3">
                    <path
                        d="M96.14,12.47l-76.71-1.1,28.3,27.85L96.14,12.47ZM53.27,49l9.88,39.17L102.1,22,53.27,49ZM117,1.6a5.59,5.59,0,0,1,4.9,8.75L66.06,105.21a5.6,5.6,0,0,1-10.44-1.15L41.74,49,1.67,9.57A5.59,5.59,0,0,1,5.65,0L117,1.6Z"
                        fill="var(--Color-SVG, #000)"
                    />
                </svg>

            </div>


        </div>
    );
};

export default InstagramStoriesFooter;