import React, {FC, useEffect, useState} from 'react';
import classes from "./EditInstagramReels.module.scss";
import ProjectPage from "../../../HOC/ProjectPage/ProjectPage";
import Page from "../../../Components/Page/Page";
import SidebarProject from "../../../Components/SidebarProject/SidebarProject";
import ContentPage from "../../../Components/ContentPage/ContentPage";
import HeaderPage from "../../../Components/HeaderPage/HeaderPage";
import StatusPostLabel from "../../../Components/StatusPostLabel/StatusPostLabel";
import Content from "../../../Components/Content/Content";
import InstagramReelsPreview from "../../../Components/InstagramComponents/InstagramReelsPreview/InstagramReelsPreview";
import BackLink from "../Components/BackLink/BackLink";
import EditButtons from "../Components/EditButtons/EditButtons";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/redux";
import Loader from "../../../Elements/Loader/Loader";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getInstagramReels} from "../../../store/thunks/PostThunks";
import {setClearPost} from "../../../store/reducers/InstagramReelsSlice";
import Tabs from "../Components/Tabs/Tabs";
import classNames from "classnames";
import ChatPost from "../Components/ChatPost/ChatPost";
import InstagramReelsParams from "./Components/InstagramReelsParams/InstagramReelsParams";

const EditInstagramReels:FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const user = useAppSelector(state => state.UserReducer.user);
    const project = useAppSelector(state => state.ProjectReducer.project);
    const teamProject = useAppSelector(state => state.ProjectReducer.team);
    const reels = useAppSelector(state => state.InstagramReelsSlice.reels)
    const isEdit = useAppSelector(state => state.InstagramReelsSlice.isEdit)
    const selectMedia = useAppSelector(state => state.InstagramReelsSlice.selectMedia)

    const [currentTab, setCurrentTab] = useState<string>("preview")
    const [searchParams, setSearchParams] = useSearchParams();
    const [isAuthor, setAuthor] = useState<boolean>(false);
    const [isCustomer, setCustomer] = useState<boolean>(false);

    const buttonsHandler = (key: string) => {}
    const changeTab = (key: string) => {
        setCurrentTab(key)
    }

    useEffect(() => {
        if (searchParams && project && user && !reels) {
            const id = searchParams.get("id");
            if (id) {
                dispatch(getInstagramReels({project: project.id, id}))
            } else {
                dispatch(setClearPost({project: project.id, author: user.id}))
            }
        }
    }, [searchParams, project, user]);

    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

                <ContentPage>
                    {(project && reels && user) ? (
                        <>
                            <HeaderPage className={classes.header}>

                                <BackLink className={classes.back} project={project.id}/>

                                <StatusPostLabel className={classes.status} status={reels.status}/>

                                <EditButtons
                                    className={classes.editButtons}
                                    status={reels.status}
                                    callback={buttonsHandler}
                                    isAuthor={isAuthor}
                                />

                            </HeaderPage>

                            <Content className={classes.columns}>

                                <Tabs
                                    callback={changeTab}
                                    activeTab={currentTab}
                                />

                                <div className={classNames(classes.column, classes.previewContainer)}
                                     data-active={currentTab === "preview"}>

                                    <InstagramReelsPreview
                                        video={selectMedia}
                                        profile={{
                                            name: "shirshonkova_a",
                                            picture: "http://localhost:5000/uploads/public/project_logos/2024/6/11909a4d-b652-471b-a9b9-52bbba5c461a-300x300.png"
                                        }}
                                        description={reels.params.description}
                                    />

                                </div>

                                <div className={classNames(classes.column, classes.paramsContainer)} data-active={currentTab === "params"}>
                                    <InstagramReelsParams className={classes.params}/>
                                </div>

                                <div className={classNames(classes.column, classes.chatContainer)} data-active={currentTab === "comments"}>

                                    {reels.status !== "unpublish" &&
                                        <ChatPost
                                            className={classes.chat}
                                            post={reels}
                                            user={user}
                                            team={teamProject}
                                        />
                                    }

                                </div>

                            </Content>
                        </>
                    ) : (
                        <Loader/>
                    )}
                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default EditInstagramReels;