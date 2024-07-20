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
import PublicationParams from "./Componets/PublicationParams/PublicationParams";
import ChatPost from "../Components/ChatPost/ChatPost";
import EditButtons from "../Components/EditButtons/EditButtons";
import Tabs from "../Components/Tabs/Tabs";
import Loader from "../../../Elements/Loader/Loader";
import BackLink from "../Components/BackLink/BackLink";
import {FileType, PhotoType} from "../../../store/types/FileType";
import {InstagramPublicationType} from "../../../store/types/PostType";
import {QueryMediaRequestType} from "../../../api/types/ProjectMediaTypes";
import ProjectMediaService from "../../../api/services/ProjectMediaService";
import {setError} from "../../../store/reducers/ProjectSlice";
import {v4 as uuid} from "uuid";
import {setPublication} from "../../../store/reducers/InstagramPublicationSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/redux";
import {useSearchParams, useNavigate} from "react-router-dom";
import {
    publishInstagramPublication,
    getInstagramPublication,
    deletePost,
    updateInstagramPublication,
} from "../../../store/thunks/PostThunks";

const EditInstagramPublication: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const user = useAppSelector(state => state.UserReducer.user);
    const project = useAppSelector(state => state.ProjectReducer.project);
    const teamProject = useAppSelector(state => state.ProjectReducer.team);
    const publication = useAppSelector(state => state.InstagramPublicationSlice.publication)

    const [editPublication, setEditPublication] = useState<InstagramPublicationType>();
    const [currentTab, setCurrentTab] = useState<string>("preview")
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectMedia, setSelectMedia] = useState<(FileType | PhotoType)[]>([]);

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
            if(selectMedia.length !== 0 && editPublication) {
                dispatch(publishInstagramPublication({
                    project: project.id,
                    description: editPublication.params.description,
                    aspectRatio: editPublication.params.aspectRatio,
                    datePublish: editPublication.datePublish,
                    media: selectMedia.map(media => media.id),
                }))
                .then((action) => {
                    if (publishInstagramPublication.fulfilled.match(action)) navigate(`?id=${action.payload.id}`);
                });
            } else {
                dispatch(setError({ message: "Додайте хоча б один медіафайл" }))
            }
        }
    }
    const saveCallback = () => {
        if(project && user) {
            if(selectMedia.length !== 0 && editPublication) {
                dispatch(updateInstagramPublication({
                    id: editPublication.id,
                    description: editPublication.params.description,
                    aspectRatio: editPublication.params.aspectRatio,
                    datePublish: editPublication.datePublish,
                    media: selectMedia.map(media => media.id),
                }))
            } else {
                dispatch(setError({ message: "Додайте хоча б один медіафайл" }))
            }
        }
    }
    const deleteCallback = () => {
        if(project && user && editPublication?.id) dispatch(deletePost({id: editPublication.id}))
    }
    const changeTab = (key: string) => {
        setCurrentTab(key)
    }

    const selectMediaHandler = (media: PhotoType | FileType): void => {
        setSelectMedia(prevState => {
            if (prevState.some(item => item.id === media.id)) {
                return prevState.filter(item => item.id !== media.id);
            } else if (prevState.length < 10) {
                return [...prevState, media];
            }
            return prevState;
        });
    }
    const unselectMediaItemHandler = (removeId: string) => {
        setSelectMedia(prevState => {
            if (prevState.some(item => item.id === removeId)) {
                return prevState.filter(item => item.id !== removeId);
            }
            return prevState;
        });
    }
    const changeSelectMediaHandler = (updateMedia: (PhotoType | FileType)[]) => {
        setSelectMedia(updateMedia)
    }

    useEffect(() => {
        if(project && user) {
            if(publication) {
                setEditPublication({
                    ...publication,
                    dateCreated: new Date(publication.dateCreated),
                    datePublish: new Date(publication.datePublish),
                })
            } else {
                setEditPublication({
                    id: uuid(),
                    project: project.id,
                    status: 'unpublish',
                    author: user.id,
                    dateCreated: new Date(),
                    datePublish: new Date(),
                    social: 'instagram',
                    typePost: 'publication',
                    params: {
                        media: [],
                        description: '',
                        aspectRatio: '1/1'
                    }
                })
            }
        }
    }, [publication]);
    useEffect(() => {
        if(searchParams && project) {
            const id = searchParams.get("id");
            if(id) dispatch(getInstagramPublication({project: project.id, id}))
        }
    }, [searchParams]);
    useEffect(() => {
        const fetchMedia = async () => {
            if (project && editPublication && editPublication.params.media.length > 0) {
                const query:QueryMediaRequestType = {
                    projectId: project.id,
                    limit: editPublication.params.media.length,
                    skip: 0,
                    mediaIds: editPublication.params.media
                }

                const mediaData = await ProjectMediaService.getMedia(query)

                if (mediaData) {
                    const mediaMap = new Map();
                    mediaData.media.forEach(media => mediaMap.set(media.id, media));

                    const sortedMedia = editPublication.params.media.map(id => mediaMap.get(id));
                    setSelectMedia(sortedMedia);
                }
            }
        };
        fetchMedia();
    }, [editPublication])
    useEffect(() => {
        return () => {
            dispatch(setPublication(null));
        }
    }, []);
    return (
        <Page>

            <SidebarProject/>

            <ContentPage>
                {project && editPublication !== undefined ? (
                    <>
                        <HeaderPage className={classes.header}>

                            <BackLink className={classes.back} project={project.id}/>

                            <StatusPostLabel className={classes.status} status={editPublication.status}/>

                            <EditButtons
                                className={classes.editButtons}
                                status={editPublication.status}
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
                                    aspectRatio={editPublication.params.aspectRatio}
                                    description={editPublication.params.description}
                                />

                            </div>

                            <div className={classNames(classes.column, classes.paramsContainer)} data-active={currentTab === "params"}>

                                <PublicationParams
                                    className={classes.params}
                                    project={project}
                                    publication={editPublication}
                                    changePublicationCallback={setEditPublication}
                                    selectMedia={selectMedia}
                                    selectMediaCallback={selectMediaHandler}
                                    unselectMediaCallback={unselectMediaItemHandler}
                                    updateMediaCallback={changeSelectMediaHandler}
                                />

                            </div>

                            <div className={classNames(classes.column, classes.chatContainer)} data-active={currentTab === "comments"}>

                                <ChatPost
                                    className={classes.chat}
                                    post={publication}
                                    user={user}
                                    team={teamProject}
                                />

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