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
import {resetPublication, setClearPublication, setSelectMedia} from "../../../store/reducers/InstagramPublicationSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/redux";
import {useSearchParams, useNavigate} from "react-router-dom";
import {publishInstagramPublication, getInstagramPublication, deletePost, updateInstagramPublication} from "../../../store/thunks/PostThunks";
import {QueryMediaRequestType} from "../../../api/types/ProjectMediaTypes";
import ProjectMediaService from "../../../api/services/ProjectMediaService";

const EditInstagramPublication: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const user = useAppSelector(state => state.UserReducer.user);
    const project = useAppSelector(state => state.ProjectReducer.project);
    const teamProject = useAppSelector(state => state.ProjectReducer.team);
    const publication = useAppSelector(state => state.InstagramPublicationSlice.publication)
    const isEdit = useAppSelector(state => state.InstagramPublicationSlice.isEdit)
    const selectMedia = useAppSelector(state => state.InstagramPublicationSlice.selectMedia)

    const [currentTab, setCurrentTab] = useState<string>("preview")
    const [searchParams, setSearchParams] = useSearchParams();

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
        }
    }
    const publishCallback = () => {
        if(project && user) {
            if(selectMedia.length !== 0 && publication) {
                dispatch(publishInstagramPublication(publication))
                .then((action) => {
                    if (publishInstagramPublication.fulfilled.match(action)) navigate(`?id=${action.payload.id}`);
                });
            } else {
                dispatch(setError({ message: "Додайте хоча б один медіафайл" }))
            }
        }
    }
    const saveCallback = () => {
        if(isEdit) {
            if(project && user) {
                if(selectMedia.length !== 0 && publication) {
                    dispatch(updateInstagramPublication(publication))
                } else {
                    dispatch(setError({ message: "Додайте хоча б один медіафайл" }))
                }
            }
        } else {
            dispatch(setError({ message: "Ви не відредагували публікацію" }))
        }
    }
    const deleteCallback = () => {
        if(project && user && publication?.id) dispatch(deletePost({id: publication.id}))
    }
    const changeTab = (key: string) => {
        setCurrentTab(key)
    }

    useEffect(() => {
        if (searchParams && project && user && !publication) {
            const id = searchParams.get("id");
            if (id) {
                dispatch(getInstagramPublication({project: project.id, id}))
            } else {
                dispatch(setClearPublication({project: project.id, author: user.id}))
            }
        }
    }, [searchParams, project, user]);
    useEffect(() => {
        const fetchMedia = async () => {
            if (project && publication && publication.params.media.length > 0 && selectMedia.length === 0) {
                const query:QueryMediaRequestType = {
                    projectId: project.id,
                    limit: publication.params.media.length,
                    skip: 0,
                    mediaIds: publication.params.media
                }

                const mediaData = await ProjectMediaService.getMedia(query)

                if (mediaData) {
                    const mediaMap = new Map();
                    mediaData.media.forEach(media => mediaMap.set(media.id, media));

                    const sortedMedia = publication.params.media.map(id => mediaMap.get(id));
                    dispatch(setSelectMedia(sortedMedia))
                }
            }
        };
        fetchMedia();
    }, [publication])
    useEffect(() => {
        return () => {
            dispatch(resetPublication());
        }
    }, []);

    return (
        <Page>

            <SidebarProject/>

            <ContentPage>
                {(project && publication && user) ? (
                    <>
                        <HeaderPage className={classes.header}>

                            <BackLink className={classes.back} project={project.id}/>

                            <StatusPostLabel className={classes.status} status={publication.status}/>

                            <EditButtons
                                className={classes.editButtons}
                                status={publication.status}
                                callback={buttonsHandler}
                                isAdmin={false}
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
                                    aspectRatio={publication.params.aspectRatio}
                                    description={publication.params.description}
                                />

                            </div>

                            <div className={classNames(classes.column, classes.paramsContainer)} data-active={currentTab === "params"}>

                                <InstagramPublicationParams className={classes.params}/>

                            </div>

                            <div className={classNames(classes.column, classes.chatContainer)} data-active={currentTab === "comments"}>

                                {publication.status !== "unpublish" &&
                                    <ChatPost
                                        className={classes.chat}
                                        post={publication}
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