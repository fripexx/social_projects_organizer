import React, {FC} from 'react';
import classes from "./Menu.module.scss";
import {Route} from "../../Routes/routes";
import {NavLink, useParams} from "react-router-dom";
import {ReactSVG} from 'react-svg'
import {useAppSelector} from "../../store/hooks/redux";

interface MenuProps {
    links: Route[];
    [key: string]: any;
}

const Menu: FC<MenuProps> = ({links, ...menuProps}) => {
    const {id} = useParams();
    const project = useAppSelector(state => state.ProjectReducer.project);
    const user = useAppSelector(state => state.UserReducer.user);

    return (
        <nav className={classes.container} {...menuProps}>

            {links.map(link => {
                const {key, name, path, icon, showOnlyAdmin} = link;

                if(showOnlyAdmin === true && user?.id !== project?.administrator) return null;

                return (
                    <NavLink
                        key={key}
                        className={({ isActive}) =>
                            isActive ? classes.link + " " + classes.link_active : classes.link
                        }
                        to={id ? path.replace(":id", id) : path}
                    >

                        {icon &&
                            <ReactSVG
                                className={classes.icon}
                                src={icon}
                                width={"24px"}
                                height={"24px"}
                                wrapper={"span"}
                            />
                        }

                        <span className={classes.text}>{name}</span>

                    </NavLink>
                )
            })}

        </nav>
    );
};

export default Menu;