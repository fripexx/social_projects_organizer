import React, {FC} from 'react';
import classes from "./LoadMore.module.scss";
import Button from "../../Elements/Button/Button";

interface LoadMoreProps {
    callback: () => void,
    text?: string,
    total?: number,
    shown?: number,
    load: boolean
}

const LoadMore:FC<LoadMoreProps> = ({callback, text, total, shown, load}) => {
    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        callback();
    }

    if(shown !== 0) {
        return (
            <div className={classes.loadMoreContainer}>

                {shown !== total &&
                    <Button
                        text={text ? text : "Показати ще"}
                        onClick={onClick}
                        disabled={load}
                    />
                }

                {(total && shown) &&
                    <span className={classes.description}>
                        Показано {shown} з {total}
                    </span>
                }

            </div>
        );
    } else {
        return (
            <></>
        )
    }
};

export default LoadMore;