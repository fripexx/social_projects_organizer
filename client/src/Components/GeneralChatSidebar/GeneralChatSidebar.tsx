import React, {FC} from 'react';
import classes from "./GeneralChatSidebar.module.scss";
import Backdrop from "../Backdrop/Backdrop";
import Logo from "../Logo/Logo";
import {ProjectType} from "../../store/types/ProjectType";
import {BasicUserInfo} from "../../store/types/UserType";

interface GeneralChatSidebarProps {
    project: ProjectType;
    children: React.ReactNode;
    showSidebar: boolean;
    hideCallback: () => void;
}

const GeneralChatSidebar:FC<GeneralChatSidebarProps> = ({children, showSidebar, hideCallback, project}) => {
    const {logo, name} = project

    const onClose = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        hideCallback();
    }

    return (
        <Backdrop isOpen={showSidebar} clickCallback={hideCallback}>

            <div className={classes.sidebar} data-show-sidebar={showSidebar}>

                <div className={classes.header}>

                    <div className={classes.branding}>

                        {typeof logo !== 'string' &&
                            <Logo photo={logo} size={50} colorBorder={"var(--Color-Dark)"}/>
                        }

                        <span className={classes.brandName}>{name}</span>

                    </div>

                    <button className={classes.hide} onClick={onClose}>

                        <svg className={classes.hideIcon} width="8" height="12" viewBox="0 0 8 12" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.66691 6.46824L6.00706 11.8083C6.13057 11.9319 6.29545 12 6.47125 12C6.64706 12 6.81193 11.9319 6.93544 11.8083L7.32871 11.4151C7.58461 11.1589 7.58461 10.7426 7.32871 10.4867L2.84445 6.00249L7.33368 1.5133C7.4572 1.3896 7.52539 1.2249 7.52539 1.0492C7.52539 0.8733 7.4572 0.7085 7.33368 0.5848L6.94042 0.1917C6.81681 0.0681 6.65203 0 6.47623 0C6.30043 0 6.13555 0.0681 6.01204 0.1917L0.66691 5.53664C0.54311 5.66064 0.47511 5.8262 0.4755 6.0022C0.47511 6.17888 0.54311 6.34434 0.66691 6.46824Z"></path>
                        </svg>

                        <span>Закрити</span>

                    </button>

                </div>

                {children}

            </div>

        </Backdrop>

    );
};

export default GeneralChatSidebar;