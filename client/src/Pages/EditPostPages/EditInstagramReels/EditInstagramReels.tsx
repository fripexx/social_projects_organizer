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
import {
    getInstagramReels,
    publishInstagramReels,
    updateInstagramReels
} from "../../../store/thunks/PostThunks";
import {setClearPost, setSelectMedia, setPost, resetPost} from "../../../store/reducers/InstagramReelsSlice";
import Tabs from "../Components/Tabs/Tabs";
import classNames from "classnames";
import ChatPost from "../Components/ChatPost/ChatPost";
import InstagramReelsParams from "./Components/InstagramReelsParams/InstagramReelsParams";
import {setError} from "../../../store/reducers/ProjectSlice";
import {QueryMediaRequestType} from "../../../api/types/ProjectMediaTypes";
import ProjectMediaService from "../../../api/services/ProjectMediaService";
import PostService from "../../../api/services/PostService";
import FileDownloader from "../../../utils/FileDownloader";
import {InstagramReelsType} from "../../../store/types/PostType";

const EditInstagramReels:FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const user = useAppSelector(state => state.UserReducer.user);
    const project = useAppSelector(state => state.ProjectReducer.project);
    const teamProject = useAppSelector(state => state.ProjectReducer.team);
    const post = useAppSelector(state => state.InstagramReelsSlice.reels)
    const isEdit = useAppSelector(state => state.InstagramReelsSlice.isEdit)
    const selectMedia = useAppSelector(state => state.InstagramReelsSlice.selectMedia)

    const [currentTab, setCurrentTab] = useState<string>("preview")
    const [searchParams, setSearchParams] = useSearchParams();
    const [isAuthor, setAuthor] = useState<boolean>(false);
    const [isCustomer, setCustomer] = useState<boolean>(false);

    const buttonsHandler = (key: string) => {
        switch (key) {
            case "publish":
                publishCallback();
                break;

            case "delete":
                deleteCallback();
                break;

            case "save":
                saveCallback();
                break;

            case "download":
                downloadCallback();
                break;

            case "send-for-confirmation":
                sendForConfirmation();
                break;

            case "reject":
                rejectCallback();
                break;

            case "confirm":
                confirmCallback();
                break;
        }
    }
    const publishCallback = () => {
        if(project && user && isAuthor) {
            if(selectMedia !== undefined && post) {
                dispatch(publishInstagramReels(post))
                    .then((action) => {
                        if (publishInstagramReels.fulfilled.match(action)) navigate(`?id=${action.payload.id}`);
                    });
            } else {
                dispatch(setError({ message: "Додайте медіафайл" }))
            }
        }
    }
    const saveCallback = () => {
        if(isEdit && isAuthor) {
            if(project && user) {
                if(selectMedia && post) {
                    dispatch(updateInstagramReels(post))
                } else {
                    dispatch(setError({ message: "Додайте хоча б один медіафайл" }))
                }
            }
        } else {
            dispatch(setError({ message: "Ви не відредагували публікацію" }))
        }
    }
    const deleteCallback = () => {
        if (project && post?.id && isAuthor) {
            PostService.deletePost(post.id)
                .then((response) => {
                    if (response === post.id) navigate(`/project/${project.id}/posts`)
                })
                .catch((error) => dispatch(setError(error)))
        }
    }
    const downloadCallback = () => {
        if(selectMedia) {
            const fileDownloader = new FileDownloader(selectMedia);
            fileDownloader.downloadFiles();
        }
    }
    const sendForConfirmation = () => {
        if(post?.id && isAuthor) {
            PostService.sendForConfirmation(post.id)
                .then((response) => dispatch(setPost(response as InstagramReelsType)))
                .catch((error) => dispatch(setError(error)))
        }
    }
    const rejectCallback = () => {
        if(post?.id && isCustomer) {
            PostService.rejectPost(post.id)
                .then((response) => dispatch(setPost(response as InstagramReelsType)))
                .catch((error) => dispatch(setError(error)))
        }
    }
    const confirmCallback = () => {
        if(post?.id && isCustomer) {
            PostService.confirmPost(post.id)
                .then((response) => dispatch(setPost(response as InstagramReelsType)))
                .catch((error) => dispatch(setError(error)))
        }
    }
    const changeTab = (key: string) => {
        setCurrentTab(key)
    }

    useEffect(() => {
        if (searchParams && project && user && !post) {
            const id = searchParams.get("id");
            if (id) {
                dispatch(getInstagramReels({project: project.id, id}))
            } else {
                dispatch(setClearPost({project: project.id, author: user.id}))
            }
        }
    }, [searchParams, project, user]);
    useEffect(() => {
        if (project && post && post.params.media && !selectMedia) {

            const query:QueryMediaRequestType = {
                projectId: project.id,
                limit: 1,
                skip: 0,
                mediaIds: [post.params.media]
            }

            ProjectMediaService.getMedia(query)
                .then((mediaData) => {
                    if (mediaData && mediaData.media.length !== 0) dispatch(setSelectMedia(mediaData.media[0]))
                })
                .catch(error => dispatch(setError(error)))
        }
    }, [post])
    useEffect(() => {
        if(post && user && project) {
            const userInTeam = project.team.find((item) => item.user === user.id);

            setCustomer(userInTeam?.role === "customer")
            setAuthor(post.author  === user.id)
        }
    }, [project, user, post]);
    useEffect(() => {
        return () => {
            dispatch(resetPost());
        }
    }, []);

    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

                <ContentPage>
                    {(project && post && user) ? (
                        <>
                            <HeaderPage className={classes.header}>

                                <BackLink className={classes.back} project={project.id}/>

                                <StatusPostLabel className={classes.status} status={post.status}/>

                                <EditButtons
                                    className={classes.editButtons}
                                    status={post.status}
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
                                        description={post.params.description}
                                    />

                                </div>

                                <div className={classNames(classes.column, classes.paramsContainer)} data-active={currentTab === "params"}>
                                    <InstagramReelsParams className={classes.params}/>
                                </div>

                                <div className={classNames(classes.column, classes.chatContainer)} data-active={currentTab === "comments"}>

                                    {post.status !== "unpublish" &&
                                        <ChatPost
                                            className={classes.chat}
                                            post={post}
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