import React, {FC} from 'react';
import classes from "./PhoneWrapper.module.scss";
import phoneBorder from "../../assets/images/phone-border.svg";

interface IPhoneWrapperProps {
    children: React.ReactNode;
}

const PhoneWrapper:FC<IPhoneWrapperProps> = ({children}) => {
    return (
        <div className={classes.phone}>

            <img
                decoding={"async"}
                loading={"lazy"}
                className={classes.border}
                src={phoneBorder}
                alt={""}
            />

            <div className={classes.header} data-theme={"dark"}>

                <svg width="307" height="23" viewBox="0 0 307 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.4956 5.44531C13.0503 5.44531 11.3081 7.11719 11.3081 9.40625V9.42188C11.3081 11.5625 12.8237 13.1406 14.9878 13.1406C16.5347 13.1406 17.5191 12.3516 17.9331 11.4609H18.0894C18.0894 11.5469 18.0816 11.6328 18.0816 11.7188C17.9956 13.875 17.2378 15.625 15.4487 15.625C14.4566 15.625 13.7612 15.1094 13.4644 14.3203L13.4409 14.2422H11.4566L11.4722 14.3281C11.8316 16.0547 13.3784 17.2812 15.4487 17.2812C18.2847 17.2812 19.9956 15.0312 19.9956 11.2344V11.2188C19.9956 7.15625 17.9019 5.44531 15.4956 5.44531ZM15.4878 11.5938C14.2066 11.5938 13.2769 10.6562 13.2769 9.35156V9.33594C13.2769 8.07812 14.2691 7.08594 15.5112 7.08594C16.7612 7.08594 17.7378 8.09375 17.7378 9.38281V9.39844C17.7378 10.6719 16.7612 11.5938 15.4878 11.5938ZM23.2225 9.69531C23.9412 9.69531 24.4647 9.14844 24.4647 8.46094C24.4647 7.76562 23.9412 7.22656 23.2225 7.22656C22.5116 7.22656 21.9803 7.76562 21.9803 8.46094C21.9803 9.14844 22.5116 9.69531 23.2225 9.69531ZM23.2225 15.4922C23.9412 15.4922 24.4647 14.9531 24.4647 14.2578C24.4647 13.5625 23.9412 13.0234 23.2225 13.0234C22.5116 13.0234 21.9803 13.5625 21.9803 14.2578C21.9803 14.9531 22.5116 15.4922 23.2225 15.4922ZM31.9181 17H33.8478V14.8359H35.3634V13.1719H33.8478V5.72656H30.9963C29.465 8.05469 27.8634 10.6484 26.4025 13.1875V14.8359H31.9181V17ZM28.2775 13.2188V13.1016C29.3713 11.1875 30.6759 9.10156 31.8322 7.33594H31.9494V13.2188H28.2775ZM39.7153 17H41.7309V5.72656H39.7231L36.7778 7.79688V9.69531L39.5825 7.71094H39.7153V17Z"
                        fill={"var(--Color-SVG, #000)"}
                    />
                    <path
                        d="M242.599 8C242.599 7.44772 243.046 7 243.599 7H244.599C245.151 7 245.599 7.44772 245.599 8V16C245.599 16.5523 245.151 17 244.599 17H243.599C243.046 17 242.599 16.5523 242.599 16V8Z"
                        fill={"var(--Color-SVG, #000)"}
                    />
                    <path
                        d="M247.599 6C247.599 5.44772 248.046 5 248.599 5H249.599C250.151 5 250.599 5.44772 250.599 6V16C250.599 16.5523 250.151 17 249.599 17H248.599C248.046 17 247.599 16.5523 247.599 16V6Z"
                        fill={"var(--Color-SVG, #000)"}
                    />
                    <path
                        d="M237.599 11.5C237.599 10.9477 238.046 10.5 238.599 10.5H239.599C240.151 10.5 240.599 10.9477 240.599 11.5V16C240.599 16.5523 240.151 17 239.599 17H238.599C238.046 17 237.599 16.5523 237.599 16V11.5Z"
                        fill={"var(--Color-SVG, #000)"}
                    />
                    <path
                        d="M232.599 14C232.599 13.4477 233.046 13 233.599 13H234.599C235.151 13 235.599 13.4477 235.599 14V16C235.599 16.5523 235.151 17 234.599 17H233.599C233.046 17 232.599 16.5523 232.599 16V14Z"
                        fill={"var(--Color-SVG, #000)"}
                    />
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M265.099 7.58753C267.566 7.58764 269.938 8.55505 271.726 10.2898C271.86 10.4237 272.075 10.4221 272.208 10.286L273.495 8.96045C273.562 8.89146 273.599 8.798 273.599 8.70076C273.598 8.60353 273.56 8.51052 273.492 8.44234C268.8 3.85255 261.398 3.85255 256.706 8.44234C256.638 8.51047 256.599 8.60345 256.599 8.70069C256.598 8.79792 256.635 8.89141 256.702 8.96045L257.99 10.286C258.122 10.4223 258.337 10.424 258.472 10.2898C260.26 8.55494 262.632 7.58752 265.099 7.58753ZM265.135 11.5894C266.49 11.5893 267.797 12.1035 268.801 13.032C268.937 13.1638 269.151 13.1609 269.284 13.0255L270.569 11.7C270.636 11.6304 270.674 11.5361 270.673 11.4381C270.672 11.3401 270.633 11.2466 270.564 11.1784C267.505 8.27385 262.767 8.27385 259.708 11.1784C259.639 11.2466 259.6 11.3401 259.599 11.4382C259.598 11.5362 259.635 11.6305 259.703 11.7L260.988 13.0255C261.121 13.1609 261.335 13.1638 261.471 13.032C262.474 12.1041 263.78 11.5899 265.135 11.5894ZM267.748 14.1767C267.75 14.275 267.712 14.3698 267.644 14.4386L265.42 16.7289C265.355 16.7962 265.266 16.834 265.174 16.834C265.081 16.834 264.992 16.7962 264.927 16.7289L262.703 14.4386C262.634 14.3697 262.597 14.2749 262.599 14.1766C262.601 14.0783 262.642 13.9853 262.714 13.9194C264.134 12.6935 266.213 12.6935 267.633 13.9194C267.705 13.9853 267.746 14.0784 267.748 14.1767Z"
                          fill={"var(--Color-SVG, #000)"}
                    />
                    <path opacity="0.35"
                          d="M280.099 9C280.099 7.067 281.666 5.5 283.599 5.5H300.599C302.532 5.5 304.099 7.067 304.099 9V14C304.099 15.933 302.532 17.5 300.599 17.5H283.599C281.666 17.5 280.099 15.933 280.099 14V9Z"
                          stroke="black"
                    />
                    <path opacity="0.4"
                          d="M305.599 10V14.2203C306.448 13.8629 307 13.0314 307 12.1102C307 11.1889 306.448 10.3574 305.599 10Z"
                          fill={"var(--Color-SVG, #000)"}
                    />
                    <path
                        d="M281.599 9C281.599 7.89543 282.494 7 283.599 7H300.599C301.703 7 302.599 7.89543 302.599 9V14C302.599 15.1046 301.703 16 300.599 16H283.599C282.494 16 281.599 15.1046 281.599 14V9Z"
                        fill={"var(--Color-SVG, #000)"}
                    />
                </svg>


            </div>

            <div className={classes.content}>
                {children}
            </div>

        </div>
    );
};

export default PhoneWrapper;