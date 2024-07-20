import React, {FC, useEffect, useState} from 'react';
import classNames from "classnames";
import {PostStatus} from "../../../../store/reducers/PostStatus";
import iconReject from "../../../../assets/images/icon-reject.svg";
import iconEdit from "../../../../assets/images/icon-edit.svg";
import iconConfirmed from "../../../../assets/images/icon-confirmed.svg";
import iconPending from "../../../../assets/images/icon-pending.svg";
import RoundIcon from "../../../RoundIcon/RoundIcon";

interface StatusPostProps {
    status: PostStatus;
    className?: string;
}

interface CurrentStatusType {
    icon: string;
    color: string;
}

const StatusPost: FC<StatusPostProps> = ({status, className}) => {
    const [currentStatus, setCurrentStatus] = useState<CurrentStatusType>();

    useEffect(() => {
        switch (status) {
            case "unpublish":
                setCurrentStatus({
                    icon: iconReject,
                    color: "var(--Color-Red, #EF0000)",
                })
                break;

            case "edit":
                setCurrentStatus({
                    icon: iconEdit,
                    color: "var(--Color-Blue, #3EACCF)",
                })
                break;

            case "confirmed":
                setCurrentStatus({
                    icon: iconConfirmed,
                    color: "var(--Color-Green, #55C000)",
                })
                break;

            case "pending":
                setCurrentStatus({
                    icon: iconPending,
                    color: "var(--Color-Yellow, #FFC42E)",
                })
                break;

            case "rejected":
                setCurrentStatus({
                    icon: iconReject,
                    color: "var(--Color-Red, #EF0000)",
                })
                break;

        }
    }, [status]);

    if (currentStatus) {
        return (
            <RoundIcon
                className={className}
                icon={currentStatus.icon}
                color={currentStatus.color}
            />
        )
    } else {
        return <></>
    }
};

export default StatusPost;