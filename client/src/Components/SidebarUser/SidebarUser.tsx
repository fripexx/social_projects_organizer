import React, {FC} from 'react';
import {useAppSelector} from "../../store/hooks/redux";
import {routes} from "../../Routes/routes";
import CardUser from "../CardUser/CardUser";
import Menu from "../Menu/Menu";
import Sidebar from "../Sidebar/Sidebar";

const SidebarUser: FC = () => {
    const user = useAppSelector(state => state.UserReducer.user)
    const userRoutes = routes.filter(route => route.showInUserMenu);

    return (
        <Sidebar>

            {user && <CardUser user={user}/> }

            <Menu links={userRoutes}/>

        </Sidebar>
    );
};

export default SidebarUser;