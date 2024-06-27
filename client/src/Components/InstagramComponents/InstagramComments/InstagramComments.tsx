import React, {FC} from 'react';
import classes from "./InstagramComments.module.scss";

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

                            <svg className={classes.like} width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.3139 6.18333L11.6641 5.55288C11.5296 5.42238 11.4001 5.29733 11.2744 5.17585C11.0546 4.96351 10.846 4.76206 10.6414 4.56141C9.00066 2.95363 6.7423 2.49843 4.93293 3.27967L4.93277 3.27973C3.11901 4.06244 1.85696 6.05591 1.90105 8.28774L1.90105 8.2878C1.93436 9.97965 2.64321 11.4798 3.67628 12.964L3.67657 12.9644C5.9314 16.2077 8.9903 18.6439 12.2533 21.0298C14.6307 19.2988 16.895 17.5125 18.8502 15.3974L19.5111 16.0083L18.8502 15.3974C20.5093 13.6026 21.8745 11.7871 22.4325 9.53909L22.4325 9.53886C23.0206 7.17223 22.0148 4.70667 20.1001 3.55451L12.3139 6.18333ZM12.3139 6.18333L12.9405 5.52971M12.3139 6.18333L12.9405 5.52971M12.9405 5.52971C13.0846 5.37935 13.212 5.24125 13.3317 5.11141C13.5615 4.86221 13.7632 4.64342 14.0019 4.42667L14.0022 4.42636M12.9405 5.52971L14.0022 4.42636M14.0022 4.42636C15.8652 2.73241 18.2782 2.4589 20.0999 3.55442L14.0022 4.42636ZM12.0872 21.1505C12.0874 21.1503 12.0877 21.1502 12.0879 21.15C12.0877 21.1501 12.0875 21.1503 12.0873 21.1504L12.0872 21.1505ZM12.1764 21.1002L12.1834 21.0999C12.1896 21.0997 12.2037 21.0997 12.2249 21.1022C12.2452 21.1045 12.2813 21.1102 12.3277 21.1253C12.3732 21.1402 12.444 21.169 12.5214 21.2254L12.1764 21.1002Z"
                                    stroke="#A5A7AA" strokeWidth="1.8"
                                />
                            </svg>

                        </div>
                    )
                })}

            </div>

        </div>
    );
};

export default InstagramComments;