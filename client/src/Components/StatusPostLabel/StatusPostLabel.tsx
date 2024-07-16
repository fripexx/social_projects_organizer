import React, {FC, useEffect, useState} from 'react';
import classes from "./StatusPostLabel.module.scss";
import editIcon from "../../assets/images/edit-icon.svg";
import rejectIcon from "../../assets/images/icon-reject.svg";
import pendingIcon from "../../assets/images/icon-pending.svg";
import confirmedIcon from "../../assets/images/icon-confirmed.svg";
import RoundIcon from "../RoundIcon/RoundIcon";
import {PostStatus} from "../../store/reducers/PostStatus";
import classNames from "classnames";

interface StatusPostLabelProps {
    status: PostStatus | undefined;
    className?: string;
}
interface CurrentStatus {
    name: string,
    icon: string,
    iconColor: string,
}

const StatusPostLabel:FC<StatusPostLabelProps> = ({status, className}) => {
    const [currentStatus, setCurrentStatus] = useState<CurrentStatus | null>(null);
    const data = {
        edit: {
            name: 'Редагування',
            icon: editIcon,
            iconColor: "var(--Color-Blue)"
        },
        rejected: {
            name: 'Відхилено',
            icon: rejectIcon,
            iconColor: "var(--Color-Red)"
        },
        pending: {
            name: 'На затвердженні',
            icon: pendingIcon,
            iconColor: "var(--Color-Yellow)"
        },
        confirmed: {
            name: 'Затверджені',
            icon: confirmedIcon,
            iconColor: "var(--Color-Green)"
        },
        unpublish: {
            name: 'Не опубліковано',
            icon: "",
            iconColor: ""
        },

    }

    useEffect(() => {
        if(status && data[status]) {
            setCurrentStatus(data[status])
        }
    }, [status])

    return (
        <div className={classNames(classes.container, className)}>

            {currentStatus?.icon && currentStatus?.iconColor &&
                <RoundIcon icon={currentStatus.icon} color={currentStatus.iconColor}/>
            }

            <span>Статус: {currentStatus?.name}</span>

        </div>
    );
};

export default StatusPostLabel;