import React, {FC} from 'react';
import classes from "./Tabs.module.scss";
import classNames from "classnames";
import Button from "../../../../Elements/Button/Button";
import previewIcon from "../../../../assets/images/eye-icon.svg";
import paramsIcon from "../../../../assets/images/params-icon.svg";
import commentIcon from "../../../../assets/images/comment-icon.svg";

export interface TabType {
    key: string;
    text: string;
    icon: string;
}

interface TabsProps {
    activeTab: string;
    callback: (key: string) => void;
    className?: string;
}

const Tabs:FC<TabsProps> = ({activeTab, callback, className}) => {
    const tabs:TabType[] = [
        {
            key: "preview",
            text: "Preview",
            icon: previewIcon,
        },
        {
            key: "params",
            text: "Параметри",
            icon: paramsIcon,
        },
        {
            key: "comments",
            text: "Коментарі",
            icon: commentIcon,
        },
    ]

    return (
        <div className={classNames(classes.container, className)}>
            {tabs.map(tab => (
                <Button
                    key={tab.key}
                    className={classNames(classes.tab, activeTab === tab.key ? classes.activeTab : "")}
                    styleType={"grey"}
                    text={tab.text}
                    icon={tab.icon}
                    iconColor={"rgba(0,0,0,0.0)"}
                    onClick={() => callback(tab.key)}
                    iconSize={20}
                />
            ))}
        </div>
    );
};

export default Tabs;