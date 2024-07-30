import React, {FC, useEffect, useState} from 'react';
import classes from "./EditInstagramPublication.module.scss";
import classNames from "classnames";
import Page from "../../../Components/Page/Page";
import SidebarProject from "../../../Components/SidebarProject/SidebarProject";
import ContentPage from "../../../Components/ContentPage/ContentPage";
import HeaderPage from "../../../Components/HeaderPage/HeaderPage";
import Content from "../../../Components/Content/Content";
import StatusPostLabel from "../../../Components/StatusPostLabel/StatusPostLabel";
import InstagramPublicationPreview from "../../../Components/InstagramComponents/InstagramPublicationPreview/InstagramPublicationPreview";
import InstagramPublicationParams from "./Componets/InstagramPublicationParams/InstagramPublicationParams";
import ChatPost from "../Components/ChatPost/ChatPost";
import EditButtons from "../Components/EditButtons/EditButtons";
import Tabs from "../Components/Tabs/Tabs";
import Loader from "../../../Elements/Loader/Loader";
import BackLink from "../Components/BackLink/BackLink";
import {setError} from "../../../store/reducers/ProjectSlice";
import {
    resetPublication,
    setClearPublication,
    setPublication,
    setSelectMedia
} from "../../../store/reducers/InstagramPublicationSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/redux";
import {useSearchParams, useNavigate} from "react-router-dom";
import {publishInstagramPublication, getInstagramPublication, updateInstagramPublication} from "../../../store/thunks/PostThunks";
import {QueryMediaRequestType} from "../../../api/types/ProjectMediaTypes";
import ProjectMediaService from "../../../api/services/ProjectMediaService";
import PostService from "../../../api/services/PostService";
import FileDownloader from "../../../utils/FileDownloader";
import {InstagramPublicationType} from "../../../store/types/PostType";

const EditInstagramPublication: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const user = useAppSelector(state => state.UserReducer.user);
    const project = useAppSelector(state => state.ProjectReducer.project);
    const teamProject = useAppSelector(state => state.ProjectReducer.team);
    const post = useAppSelector(state => state.InstagramPublicationSlice.publication)
    const isEdit = useAppSelector(state => state.InstagramPublicationSlice.isEdit)
    const selectMedia = useAppSelector(state => state.InstagramPublicationSlice.selectMedia)

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
            if(selectMedia.length !== 0 && post) {
                dispatch(publishInstagramPublication(post))
                .then((action) => {
                    if (publishInstagramPublication.fulfilled.match(action)) navigate(`?id=${action.payload.id}`);
                });
            } else {
                dispatch(setError({ message: "Додайте хоча б один медіафайл" }))
            }
        }
    }
    const saveCallback = () => {
        if(isEdit && isAuthor) {
            if(project && user) {
                if(selectMedia.length !== 0 && post) {
                    dispatch(updateInstagramPublication(post))
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
            PostService.deletePost( post.id)
                .then((response) => {
                    if (response === post.id) navigate(`/project/${project.id}/posts`)
                })
                .catch((error) => dispatch(setError(error)))
        }
    }
    const downloadCallback = () => {
        const fileDownloader = new FileDownloader(selectMedia);
        fileDownloader.downloadFiles();
    }
    const sendForConfirmation = () => {
        if(post?.id && isAuthor) {
            PostService.sendForConfirmation(post.id)
                .then((response) => dispatch(setPublication(response as InstagramPublicationType)))
                .catch((error) => dispatch(setError(error)))
        }
    }
    const rejectCallback = () => {
        if(post?.id && isCustomer) {
            PostService.rejectPost(post.id)
                .then((response) => dispatch(setPublication(response as InstagramPublicationType)))
                .catch((error) => dispatch(setError(error)))
        }
    }
    const confirmCallback = () => {
        if(post?.id && isCustomer) {
            PostService.confirmPost(post.id)
                .then((response) => dispatch(setPublication(response as InstagramPublicationType)))
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
                dispatch(getInstagramPublication({project: project.id, id}))
            } else {
                dispatch(setClearPublication({project: project.id, author: user.id}))
            }
        }
    }, [searchParams, project, user]);
    useEffect(() => {
        if (project && post && post.params.media.length > 0 && selectMedia.length === 0) {

            const query:QueryMediaRequestType = {
                projectId: project.id,
                limit: post.params.media.length,
                skip: 0,
                mediaIds: post.params.media
            }

            ProjectMediaService.getMedia(query)
                .then((mediaData) => {
                    if (mediaData) {
                        const mediaMap = new Map();
                        mediaData.media.forEach(media => mediaMap.set(media.id, media));

                        const sortedMedia = post.params.media.map(id => mediaMap.get(id));
                        dispatch(setSelectMedia(sortedMedia))
                    }
                })
                .catch(error => dispatch(setError(error)))

        }
    }, [post])
    useEffect(() => {
        return () => {
            dispatch(resetPublication());
        }
    }, []);
    useEffect(() => {
        if(post && user && project) {
            const userInTeam = project.team.find((item) => item.user === user.id);

            setCustomer(userInTeam?.role === "customer")
            setAuthor(post.author  === user.id)
        }
    }, [project, user, post]);

    return (
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

                                <InstagramPublicationPreview
                                    className={classes.preview}
                                    media={selectMedia}
                                    profile={{ name: "shirshonkova_a", picture: ""}}
                                    aspectRatio={post.params.aspectRatio}
                                    description={post.params.description}
                                />

                            </div>

                            <div className={classNames(classes.column, classes.paramsContainer)} data-active={currentTab === "params"}>

                                <InstagramPublicationParams className={classes.params}/>

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
    );
};

export default EditInstagramPublication;