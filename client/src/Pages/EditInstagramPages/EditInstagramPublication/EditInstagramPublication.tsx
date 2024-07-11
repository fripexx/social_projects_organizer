import React, {FC, useEffect, useState} from 'react';
import classes from "./EditInstagramPublication.module.scss";
import Page from "../../../Components/Page/Page";
import SidebarProject from "../../../Components/SidebarProject/SidebarProject";
import ContentPage from "../../../Components/ContentPage/ContentPage";
import HeaderPage from "../../../Components/HeaderPage/HeaderPage";
import Content from "../../../Components/Content/Content";
import ProjectPage from "../../../HOC/ProjectPage/ProjectPage";
import Button from "../../../Elements/Button/Button";
import StatusPostLabel from "../../../Components/StatusPostLabel/StatusPostLabel";
import InstagramPublicationPreview from "../../../Components/InstagramComponents/InstagramPublicationPreview/InstagramPublicationPreview";
import PublicationParams from "./Componets/PublicationParams/PublicationParams";
import {FileType, PhotoType} from "../../../store/types/FileType";
import {
    AspectRatio
} from "../../../Components/InstagramComponents/Modules/InstagramPictureSlider/InstagramPictureSlider";
import Chat from "../../../Components/Chat/Chat";
import {useAppSelector} from "../../../store/hooks/redux";
import {TeamMemberType} from "../../../store/types/TeamMemberType";
import {PostStatus} from "../../../store/reducers/PostStatus";
import EditButtons from "./Componets/EditButtons/EditButtons";
import {useSocket} from "../../../context/Socket-Context";
import {BasicUserInfo} from "../../../store/types/UserType";
import Tabs from "./Componets/Tabs/Tabs";
import classNames from "classnames";
import icon from "../../../assets/images/plus_icon.svg"

const EditInstagramPublication: FC = () => {
    const user = useAppSelector(state => state.UserReducer.user);
    const project = useAppSelector(state => state.ProjectReducer.project);
    const teamProject = useAppSelector(state => state.ProjectReducer.team);
    const publication = useAppSelector(state => state.InstagramPublicationSlice.publication)
    const socket = useSocket()

    const [status, setStatus] = useState<PostStatus | undefined>(undefined)
    const [teamPost, setTeamPost] = useState<TeamMemberType[]>([]);
    const [teamChat, setTeamChat] = useState<BasicUserInfo[]>([]);
    const [selectMedia, setSelectMedia] = useState<(FileType | PhotoType)[]>([])
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1/1')
    const [description, setDescription] = useState<string>('');
    const [currentTab, setCurrentTab] = useState<string>("preview")

    const buttonsHandler = (key: string) => {}
    const selectMediaHandler = (media: (PhotoType | FileType)[]): void => {
        setSelectMedia(media);
    }
    const changeRatioHandler = (value: string) => {
        setAspectRatio(value as AspectRatio);
    }
    const changeDescriptionHandler = (value: string) => {
        setDescription(value)
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
        if(publication) setStatus(publication.status)
    }, [publication]);

    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

                <ContentPage>

                    <HeaderPage className={classes.header}>

                        <Button text={"Назад"} onClick={() => {}}/>

                        <EditButtons
                            status={status}
                            callback={buttonsHandler}
                            isAdmin={false}
                        />

                        <StatusPostLabel status={status}/>

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
                                profile={{
                                    name: "shirshonkova_a",
                                    picture: ""
                                }}
                                aspectRatio={aspectRatio}
                                description={description}
                            />
                        </div>

                        <div className={classNames(classes.column, classes.paramsContainer)} data-active={currentTab === "params"}>
                            <PublicationParams
                                className={classes.params}
                                description={description}
                                changeDescription={changeDescriptionHandler}
                                selectMedіaCallback={selectMediaHandler}
                                aspectRatio={aspectRatio}
                                changeRatioCallback={changeRatioHandler}

                            />
                        </div>

                        <div className={classNames(classes.column, classes.chatContainer)} data-active={currentTab === "comments"}>
                            {status && publication && user ? (
                                <>
                                    <Chat
                                        chat={publication.id}
                                        socket={socket}
                                        model={'Post'}
                                        currentUser={user}
                                        team={teamChat}
                                        unreadCallback={() => {}}
                                    />
                                </>
                            ) : (
                                <span className={classes.withoutChat}>Для того щоб розпочати чат потрібно зберегти публікацію</span>
                            )}

                        </div>

                    </Content>

                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default EditInstagramPublication;