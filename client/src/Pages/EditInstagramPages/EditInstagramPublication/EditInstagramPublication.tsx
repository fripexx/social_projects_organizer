import React, {FC, useEffect, useState} from 'react';
import classes from "./EditInstagramPublication.module.scss";
import Page from "../../../Components/Page/Page";
import SidebarProject from "../../../Components/SidebarProject/SidebarProject";
import ContentPage from "../../../Components/ContentPage/ContentPage";
import HeaderPage from "../../../Components/HeaderPage/HeaderPage";
import Content from "../../../Components/Content/Content";
import Button from "../../../Elements/Button/Button";
import StatusPostLabel from "../../../Components/StatusPostLabel/StatusPostLabel";
import InstagramPublicationPreview from "../../../Components/InstagramComponents/InstagramPublicationPreview/InstagramPublicationPreview";
import PublicationParams from "./Componets/PublicationParams/PublicationParams";
import {FileType, PhotoType} from "../../../store/types/FileType";
import {AspectRatio} from "../../../Components/InstagramComponents/Modules/InstagramPictureSlider/InstagramPictureSlider";
import Chat from "../../../Components/Chat/Chat";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/redux";
import {TeamMemberType} from "../../../store/types/TeamMemberType";
import EditButtons from "./Componets/EditButtons/EditButtons";
import {useSocket} from "../../../context/Socket-Context";
import {BasicUserInfo} from "../../../store/types/UserType";
import Tabs from "./Componets/Tabs/Tabs";
import classNames from "classnames";
import {setError} from "../../../store/reducers/ProjectSlice";
import {
    publishInstagramPublication,
    getInstagramPublication,
} from "../../../store/thunks/PostThunks";
import {useSearchParams} from "react-router-dom";
import {InstagramPublicationType} from "../../../store/types/PostType";
import {v4 as uuid} from "uuid";
import Loader from "../../../Elements/Loader/Loader";
import ProjectMediaService from "../../../api/services/ProjectMediaService";
import {QueryMediaRequestType} from "../../../api/types/ProjectMediaTypes";
import {Socket} from "socket.io-client";
import {setPublication} from "../../../store/reducers/InstagramPublicationSlice";

const EditInstagramPublication: FC = () => {
    const dispatch = useAppDispatch()
    const socket = useSocket()

    const user = useAppSelector(state => state.UserReducer.user);
    const project = useAppSelector(state => state.ProjectReducer.project);
    const teamProject = useAppSelector(state => state.ProjectReducer.team);
    const publication = useAppSelector(state => state.InstagramPublicationSlice.publication)

    const [editPublication, setEditPublication] = useState<InstagramPublicationType>();
    const [teamPost, setTeamPost] = useState<TeamMemberType[]>([]);
    const [teamChat, setTeamChat] = useState<BasicUserInfo[]>([]);
    const [currentTab, setCurrentTab] = useState<string>("preview")
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectMedia, setSelectMedia] = useState<(FileType | PhotoType)[]>([])
    const [socketConnected, setSocketConnected] = useState<boolean>(false)

    const buttonsHandler = (key: string) => {
        switch (key) {
            case "publish":
                publishCallback();
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
            } else {
                dispatch(setError({ message: "Додайте хоча б один медіафайл" }))
            }
        }
    }
    const changeRatioHandler = (value: string) => {
        setEditPublication(prevState => {
            if(prevState !== undefined) return {...prevState, params: {...prevState.params, aspectRatio: value as AspectRatio}};
            return prevState;
        })
    }
    const changeDescriptionHandler = (value: string) => {
        setEditPublication(prevState => {
            if(prevState !== undefined) return {...prevState, params: {...prevState.params, description: value}};
            return prevState;
        })
    }
    const changeDateCallback = (date: Date) => {
        setEditPublication(prevState => {
            if(prevState !== undefined) return {...prevState, datePublish: date};
            return prevState;
        })
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
    const changeSelectMediaHandler=(updateMedia: (PhotoType | FileType)[]) => {
        setSelectMedia(updateMedia)
    }
    const changeTab = (key: string) => {
        setCurrentTab(key)
    }

    useEffect(() => {
        if(project && teamProject.length != 0) {
            const filterTeam = teamProject.filter(teamMember => teamMember.role === "customer");
            const adminMember = teamProject.find(teamMember => teamMember.user.id === project.administrator);

            if(adminMember && !filterTeam.some(teamMember => teamMember.user.id === adminMember.user.id)) filterTeam.push(adminMember)

            setTeamPost(filterTeam)
        }
    }, [teamProject]);
    useEffect(() => {
        setTeamChat(teamPost.map(item => item.user))
    }, [teamPost]);
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

                if (mediaData) setSelectMedia(mediaData.media)
            }
        };
        fetchMedia();
    }, [editPublication])
    useEffect(() => {
        if(publication && !socketConnected) {
            const socketRoom: Socket = socket.emit('joinRoom', {room: publication.id, model: "Post"});
            setSocketConnected(socketRoom.connected);
        }
        return () => {
            if(publication) {
                socket.emit("leaveRoom", {room: publication.id, model: "Post"});
                dispatch(setPublication(null));
            }
        }
    }, [publication]);

    return (
        <Page>

            <SidebarProject/>

            <ContentPage>
                {editPublication !== undefined ? (
                    <>
                        <HeaderPage className={classes.header}>

                            <Button className={classes.back} text={"Назад"} onClick={() => {}}/>

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
                                    description={editPublication.params.description}
                                    changeDescription={changeDescriptionHandler}
                                    aspectRatio={editPublication.params.aspectRatio}
                                    changeRatioCallback={changeRatioHandler}
                                    date={editPublication.datePublish}
                                    changeDateCallback={changeDateCallback}
                                    selectMedia={selectMedia}
                                    selectMediaCallback={selectMediaHandler}
                                    unselectMediaCallback={unselectMediaItemHandler}
                                    updateMediaCallback={changeSelectMediaHandler}
                                />

                            </div>

                            <div className={classNames(classes.column, classes.chatContainer)} data-active={currentTab === "comments"}>

                                {editPublication.status !== "unpublish" && publication && user ? (
                                    <Chat
                                        className={classes.chat}
                                        chat={publication.id}
                                        socket={socket}
                                        model={'Post'}
                                        currentUser={user}
                                        team={teamChat}
                                    />
                                ) : (
                                    <span className={classes.withoutChat}>Для того щоб розпочати чат потрібно зберегти публікацію</span>
                                )}

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