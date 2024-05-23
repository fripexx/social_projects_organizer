import React, {FC, useEffect, useState} from 'react';
import classes from "./GeneralChatWidget.module.scss";

interface GeneralChatLinkProps {
    text?: string;
    countMessage?: number;
    callback: () => void;
}

const GeneralChatWidget: FC<GeneralChatLinkProps> = ({text = "Загальний чат", countMessage, callback}) => {
    const [showMaxCount, setShowMaxCount] = useState<boolean>(false)

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
    }, [countMessage])

    return (
        <button className={classes.button} onClick={onClick}>

            <span className={classes.text}>{text}</span>

            {!!countMessage &&
                <span className={classes.count}>
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