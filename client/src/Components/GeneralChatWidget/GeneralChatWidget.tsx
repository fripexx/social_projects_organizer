import React, {FC, useEffect, useState} from 'react';
import classes from "./GeneralChatWidget.module.scss";

interface GeneralChatLinkProps {
    text?: string;
    countMessage?: number;
    callback: () => void;
}

const GeneralChatWidget: FC<GeneralChatLinkProps> = ({text = "Загальний чат", countMessage, callback}) => {
    const [showMaxCount, setShowMaxCount] = useState<boolean>(false)
    const [showEffect, setShowEffect] = useState<boolean>(false)

    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        callback();
    }

    useEffect(() => {
        if(countMessage && countMessage > 99 ) {
            setShowMaxCount(true)
        } else {
            setShowMaxCount(false)
        }
        setShowEffect(true)
    }, [countMessage])

    useEffect(() => {
        setTimeout(() => {
            setShowEffect(false)
        }, 1000)
    }, [showEffect])

    return (
        <button className={classes.button} onClick={onClick}>

            <span className={classes.text}>{text}</span>

            <span className={classes.icon}>

                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M13.6288 20.4718L13.0867 21.3877C12.6035 22.204 11.3965 22.204 10.9133 21.3877L10.3712 20.4718C9.95073 19.7614 9.74049 19.4063 9.40279 19.2098C9.06509 19.0134 8.63992 19.0061 7.78958 18.9915C6.53422 18.9698 5.74689 18.8929 5.08658 18.6194C3.86144 18.1119 2.88807 17.1386 2.3806 15.9134C2 14.9946 2 13.8297 2 11.5V10.5C2 7.22657 2 5.58985 2.7368 4.38751C3.14908 3.71473 3.71473 3.14908 4.38751 2.7368C5.58985 2 7.22657 2 10.5 2H13.5C16.7734 2 18.4101 2 19.6125 2.7368C20.2853 3.14908 20.8509 3.71473 21.2632 4.38751C22 5.58985 22 7.22657 22 10.5V11.5C22 13.8297 22 14.9946 21.6194 15.9134C21.1119 17.1386 20.1386 18.1119 18.9134 18.6194C18.2531 18.8929 17.4658 18.9698 16.2104 18.9915C15.36 19.0061 14.9349 19.0134 14.5972 19.2098C14.2595 19.4062 14.0492 19.7614 13.6288 20.4718Z"
                        fill="var(--Color-SVG)"
                    />
                </svg>

            </span>

            {!!countMessage &&
                <span className={classes.count} data-show-effect={showEffect}>
                    {showMaxCount ? 99 : countMessage}
                    {showMaxCount &&
                        <span className={classes.plus}>+</span>
                    }
                </span>
            }

        </button>
    );
};

export default GeneralChatWidget;