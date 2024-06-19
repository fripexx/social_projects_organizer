import React, {FC} from 'react';
import NotificationsButton from "./Components/NotificationsButton/NotificationsButton";
import Backdrop from "../Backdrop/Backdrop";
import NotificationsList from "./Components/NotificationsList/NotificationsList";
import {NotificationType} from "./types/NotificationType";

interface NotificationsWidgetProps {
    notifications: NotificationType[]
}

const NotificationsWidget: FC<NotificationsWidgetProps> = ({notifications}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const toggleWidget = () => {
        setIsOpen(prevState => !prevState);
    }
    const hideWidget = () => {
        setIsOpen(false);
    }

    return (
        <>
            <Backdrop isOpen={isOpen} clickCallback={hideWidget}>
                {notifications.length !== 0 &&
                    <NotificationsList
                        isOpen={isOpen}
                        notifications={notifications}
                        hideCallback={hideWidget}
                    />
                }
            </Backdrop>

            {notifications.length !== 0 &&
                <NotificationsButton
                    show={notifications.length !== 0}
                    isOpen={isOpen}
                    clickCallback={toggleWidget}
                />
            }

        </>
    );
};

export default NotificationsWidget;