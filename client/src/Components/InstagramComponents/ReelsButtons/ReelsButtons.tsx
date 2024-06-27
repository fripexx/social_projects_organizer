import React, {CSSProperties, FC} from 'react';
import classes from "./ReelsButtons.module.scss";
import classNames from "classnames";

interface ReelsHeaderProps {
    className?: string;
    style?: CSSProperties;
}

const ReelsButtons:FC<ReelsHeaderProps> = ({className, style}) => {
    return (
        <div className={classNames(classes.container, className)} style={style}>

            <div className={classes.button}>

                <svg className={classes.likeIcon} width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.314 6.18327L11.6642 5.55282C11.5296 5.42231 11.4002 5.29726 11.2744 5.17578C11.0546 4.96343 10.8461 4.76199 10.6415 4.56135C9.00072 2.95357 6.74236 2.49837 4.93299 3.2796L4.93283 3.27967C3.11907 4.06238 1.85702 6.05585 1.90111 8.28768L1.90111 8.28774C1.93442 9.97959 2.64327 11.4797 3.67634 12.964L3.67663 12.9644C5.93146 16.2077 8.99036 18.6438 12.2533 21.0297C14.6308 19.2988 16.895 17.5125 18.8503 15.3973L19.5111 16.0082L18.8503 15.3973C20.5094 13.6025 21.8746 11.787 22.4325 9.53903L22.4326 9.53879C23.0207 7.17217 22.0148 4.70661 20.1001 3.55445L12.314 6.18327ZM12.314 6.18327L12.9405 5.52965M12.314 6.18327L12.9405 5.52965M12.9405 5.52965C13.0847 5.37928 13.212 5.24118 13.3318 5.11134C13.5615 4.86215 13.7633 4.64336 14.0019 4.42661L14.0023 4.42629M12.9405 5.52965L14.0023 4.42629M14.0023 4.42629C15.8653 2.73235 18.2782 2.45884 20.1 3.55435L14.0023 4.42629Z"
                        fill="var(--Color-SVG, #FE0135)"
                        stroke="var(--Color-SVG, #FE0135)"
                        strokeWidth="1.8"
                    />
                </svg>

                <span>64</span>

            </div>

            <div className={classes.button}>

                <svg className={classes.commentIcon} width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_887_314" fill="white">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.4517 17.6305C22.435 15.9834 23 14.0577 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C14.062 23 15.9915 22.4326 17.6409 21.4455L22.8478 22.8407L21.4517 17.6305Z"
                        />
                    </mask>
                    <path
                        d="M21.4517 17.6305L19.9062 16.7078C19.6568 17.1255 19.5871 17.6264 19.7131 18.0963L21.4517 17.6305ZM17.6409 21.4455L18.1068 19.7068C17.6362 19.5807 17.1346 19.6508 16.7165 19.901L17.6409 21.4455ZM22.8478 22.8407L22.3819 24.5793C23.0031 24.7458 23.6659 24.5682 24.1206 24.1135C24.5753 23.6587 24.7529 22.996 24.5865 22.3748L22.8478 22.8407ZM21.2 12C21.2 13.7239 20.7276 15.3319 19.9062 16.7078L22.9973 18.5531C24.1425 16.6348 24.8 14.3915 24.8 12H21.2ZM12 2.8C17.081 2.8 21.2 6.91898 21.2 12H24.8C24.8 4.93076 19.0692 -0.8 12 -0.8V2.8ZM2.8 12C2.8 6.91898 6.91898 2.8 12 2.8V-0.8C4.93076 -0.8 -0.8 4.93076 -0.8 12H2.8ZM12 21.2C6.91898 21.2 2.8 17.081 2.8 12H-0.8C-0.8 19.0692 4.93076 24.8 12 24.8V21.2ZM16.7165 19.901C15.3387 20.7256 13.7275 21.2 12 21.2V24.8C14.3965 24.8 16.6443 24.1397 18.5653 22.99L16.7165 19.901ZM17.175 23.1842L22.3819 24.5793L23.3137 21.102L18.1068 19.7068L17.175 23.1842ZM24.5865 22.3748L23.1904 17.1646L19.7131 18.0963L21.1091 23.3065L24.5865 22.3748Z"
                        fill="var(--Color-SVG, #000)"
                        mask="url(#path-1-inside-1_887_314)"
                    />
                </svg>

                <span>3</span>

            </div>

            <div className={classes.button}>

                <svg className={classes.sendIcon} width="24" height="24" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 122.88 108.3">
                    <path
                        d="M96.14,12.47l-76.71-1.1,28.3,27.85L96.14,12.47ZM53.27,49l9.88,39.17L102.1,22,53.27,49ZM117,1.6a5.59,5.59,0,0,1,4.9,8.75L66.06,105.21a5.6,5.6,0,0,1-10.44-1.15L41.74,49,1.67,9.57A5.59,5.59,0,0,1,5.65,0L117,1.6Z"
                        fill="var(--Color-SVG, #000)"
                    />
                </svg>

            </div>

            <div className={classes.button}>
                <svg className={classes.dotsIcon} width="15" height="4" viewBox="0 0 15 4" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <rect width="3" height="3" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
                    <rect width="3" height="3" x="6" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
                    <rect width="3" height="3" x="12" y="0.5" rx="1.5" fill={"var(--Color-SVG, #000)"}/>
                </svg>
            </div>



        </div>
    );
};

export default ReelsButtons;