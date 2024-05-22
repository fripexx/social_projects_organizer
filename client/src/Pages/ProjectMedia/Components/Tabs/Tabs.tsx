import React, {FC, useEffect, useState} from 'react';
import classes from "./Tabs.module.scss";
import {NavLink, useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../../../store/hooks/redux";

const Tabs:FC = () => {
    const project = useAppSelector(state => state.ProjectReducer.project)
    const [link, setLink] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        if(project) setLink(`/project/${project.id}/media_library`)
    }, [project])
    useEffect(() => {
        setActive(searchParams.get("type"))
    }, [searchParams]);
    return (
        <div className={classes.tabs}>

            <NavLink
                className={classes.tab}
                to={link}
                children={"Усі"}
                data-active={!active}
            />

            <NavLink
                className={classes.tab}
                to={`${link}?type=image`}
                children={"Фото"}
                data-active={active === "image"}
            />

            <NavLink
                className={classes.tab}
                to={`${link}?type=video`}
                children={"Відео"}
                data-active={active === "video"}
            />

        </div>
    );
};

export default Tabs;