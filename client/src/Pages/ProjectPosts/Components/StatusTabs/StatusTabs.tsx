import React, {FC, useEffect, useState} from 'react';
import classes from "./StatusTabs.module.scss";
import {NavLink, useSearchParams} from "react-router-dom";
import {v4 as uuid} from "uuid";
import editIcon from "../../../../assets/images/icon-edit.svg";
import rejectIcon from "../../../../assets/images/icon-reject.svg";
import pendingIcon from "../../../../assets/images/icon-pending.svg";
import confirmedIcon from "../../../../assets/images/icon-confirmed.svg";
import RoundIcon from "../../../../Components/RoundIcon/RoundIcon";

interface TabType {
    text: string,
    status?: string,
    icon?: string,
    color?: string,
}

const StatusTabs: FC = () => {
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
        <div className={classes.container}>
            {tabs.map(tab => {
                const {status, text, icon, color} = tab

                return (
                    <NavLink
                        key={uuid()}
                        className={classes.item}
                        to={status ? `?status=${status}` : ""}
                        data-active={status === activeStatus}
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