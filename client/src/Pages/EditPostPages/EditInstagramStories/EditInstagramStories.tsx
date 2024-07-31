import React, {FC, useEffect, useState} from 'react';
import classes from "./EditInstagramStories.module.scss";
import ProjectPage from "../../../HOC/ProjectPage/ProjectPage";
import Page from "../../../Components/Page/Page";
import SidebarProject from "../../../Components/SidebarProject/SidebarProject";
import ContentPage from "../../../Components/ContentPage/ContentPage";
import HeaderPage from "../../../Components/HeaderPage/HeaderPage";
import StatusPostLabel from "../../../Components/StatusPostLabel/StatusPostLabel";
import Content from "../../../Components/Content/Content";
import InstagramStoriesPreview
    from "../../../Components/InstagramComponents/InstagramStoriesPreview/InstagramStoriesPreview";
import BackLink from "../Components/BackLink/BackLink";
import EditButtons from "../Components/EditButtons/EditButtons";
import Tabs from "../Components/Tabs/Tabs";
import classNames from "classnames";
import ChatPost from "../Components/ChatPost/ChatPost";
import Loader from "../../../Elements/Loader/Loader";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getInstagramStories, publishInstagramStories, updateInstagramStories} from "../../../store/thunks/PostThunks";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/redux";
import {setClearPost, setPost, setSelectMedia} from "../../../store/reducers/InstagramStoriesSlice";
import {setError} from "../../../store/reducers/ProjectSlice";
import PostService from "../../../api/services/PostService";
import ProjectMediaService from "../../../api/services/ProjectMediaService";
import {InstagramStoriesType} from "../../../store/types/PostType";
import {QueryMediaRequestType} from "../../../api/types/ProjectMediaTypes";
import FileDownloader from "../../../utils/FileDownloader";
import InstagramStoriesParams from "./Components/InstagramStoriesParams/InstagramStoriesParams";

const EditInstagramStories:FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const user = useAppSelector(state => state.UserReducer.user);
    const project = useAppSelector(state => state.ProjectReducer.project);
    const teamProject = useAppSelector(state => state.ProjectReducer.team);
    const post = useAppSelector(state => state.InstagramStoriesSlice.stories)
    const isEdit = useAppSelector(state => state.InstagramStoriesSlice.isEdit)
    const selectMedia = useAppSelector(state => state.InstagramStoriesSlice.selectMedia)

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
                dispatch(publishInstagramStories(post))
                    .then((action) => {
                        if (publishInstagramStories.fulfilled.match(action)) navigate(`?id=${action.payload.id}`);
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
                    dispatch(updateInstagramStories(post))
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
                .then((response) => dispatch(setPost(response as InstagramStoriesType)))
                .catch((error) => dispatch(setError(error)))
        }
    }
    const rejectCallback = () => {
        if(post?.id && isCustomer) {
            PostService.rejectPost(post.id)
                .then((response) => dispatch(setPost(response as InstagramStoriesType)))
                .catch((error) => dispatch(setError(error)))
        }
    }
    const confirmCallback = () => {
        if(post?.id && isCustomer) {
            PostService.confirmPost(post.id)
                .then((response) => dispatch(setPost(response as InstagramStoriesType)))
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
                dispatch(getInstagramStories({project: project.id, id}))
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

                                <div className={classNames(classes.column, classes.previewContainer)} data-active={currentTab === "preview"}>
                                    
                                   <InstagramStoriesPreview
                                        profile={{
                                            name: "",
                                            picture: ""
                                        }}
                                        media={selectMedia}
                                    />

                                </div>

                                <div className={classNames(classes.column, classes.paramsContainer)} data-active={currentTab === "params"}>
                                    <InstagramStoriesParams className={classes.params}/>
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

export default EditInstagramStories;