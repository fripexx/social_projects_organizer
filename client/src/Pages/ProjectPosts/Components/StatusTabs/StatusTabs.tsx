import React, {FC, useEffect, useState} from 'react';
import classes from "./StatusTabs.module.scss";
import {NavLink, useSearchParams} from "react-router-dom";
import {v4 as uuid} from "uuid";
import editIcon from "../../../../assets/images/icons/edit-icon.svg";
import rejectIcon from "../../../../assets/images/icons/reject-icon.svg";
import pendingIcon from "../../../../assets/images/icons/pending-icon.svg";
import confirmedIcon from "../../../../assets/images/icons/confirmed-icon.svg";
import RoundIcon from "../../../../Components/RoundIcon/RoundIcon";
import classNames from "classnames";

interface TabType {
    text: string,
    status?: string,
    icon?: string,
    color?: string,
}

interface StatusTabsProps {
    className?: string;
}

const StatusTabs: FC<StatusTabsProps> = ({className}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeStatus, setActiveStatus] = useState<string>("");

    const tabs: TabType[] = [
        {
            text: "Усі"
        },
        {
            text: "Редагування",
            status: "edit",
            icon: editIcon,
            color: "var(--Color-Blue)"
        },
        {
            text: "Відхилені",
            status: "rejected",
            icon: rejectIcon,
            color: "var(--Color-Red)"
        },
        {
            text: "На затвердженні",
            status: "pending",
            icon: pendingIcon,
            color: "var(--Color-Yellow)"
        },
        {
            text: "Затверджені",
            status: "confirmed",
            icon: confirmedIcon,
            color: "var(--Color-Green)"
        },
    ]

    useEffect(() => {
        const paramsStatus = searchParams.get('status');
        paramsStatus ? setActiveStatus(paramsStatus) : setActiveStatus("");
    }, [searchParams])

    return (
        <div className={classNames(classes.container, className)}>
            {tabs.map(tab => {
                const {status, text, icon, color} = tab

                return (
                    <NavLink
                        key={uuid()}
                        className={classes.item}
                        to={status ? `?status=${status}` : ""}
                        data-active={status === undefined && activeStatus === "" ? true : status === activeStatus}
                    >

                        {icon && color &&
                            <RoundIcon icon={icon} color={color}/>
                        }

                        <span>{text}</span>

                    </NavLink>
                )
            })}
        </div>
    );
};

export default StatusTabs;