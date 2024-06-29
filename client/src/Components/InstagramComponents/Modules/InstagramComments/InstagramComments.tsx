import React, {FC} from 'react';
import classes from "./InstagramComments.module.scss";
import {ReactSVG} from "react-svg";
import heartIcon from "../../images/heart-icon.svg";

interface Comments {
    user: string,
    text: string,
}

const InstagramComments: FC = () => {
    const comments: Comments[] = [
        {
            user: 'cristiano',
            text: 'cool 😍😍😍',
        },
        {
            user: 'kyliejenner',
            text: 'wow 🤯🤯🤯',
        },
        {
            user: 'kimkardashian',
            text: '🥰🥰🥰',
        },
    ]

    return (
        <div className={classes.container}>

            <div className={classes.showAll}>
                Переглянути всі коментарі (5)
            </div>

            <div className={classes.commentsList}>

                {comments.map(comment => {
                    const {user, text} = comment

                    return (
                        <div key={user} className={classes.comment}>

                            <span className={classes.commentText}>
                                <strong>{user}</strong>{text}
                            </span>

                            <ReactSVG className={classes.like} src={heartIcon}/>

                        </div>
                    )
                })}

            </div>

        </div>
    );
};

export default InstagramComments;