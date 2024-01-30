import React, {FC} from 'react';
import classes from "./SidebarUser.module.scss";
const SidebarUser: FC = () => {
    return (
        <div className={classes.container}>
            <button>
                Вийти
            </button>
        </div>
    );
};

export default SidebarUser;