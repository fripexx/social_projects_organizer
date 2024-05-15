import React, {FC, useEffect} from 'react';
import ProjectPage from "../../HOC/ProjectPage/ProjectPage";
import Page from "../../Components/Page/Page";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Title from "../../Elements/Title/Title";
import Content from "../../Components/Content/Content";
import MediaFileUpload from "../../Components/MediaFileUpload/MediaFileUpload";
import Media from "../../Components/Media/Media";
import {PreviewFileType} from "../../Components/PreviewFile/PreviewFile";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {deleteMedia, getMedia, uploadMedia} from "../../store/thunks/ProjectThunks";

const ProjectMedia:FC = () => {
    const dispatch = useAppDispatch();
    const project = useAppSelector(state => state.ProjectReducer.project);
    const user = useAppSelector(state => state.UserReducer.user)
    const media = useAppSelector(state => state.ProjectReducer.media);

    const uploadCallback = (files: PreviewFileType[]): void => {
        if(project) {
            const formData = new FormData();

            formData.append("projectId", project.id);
            for (const file of files) formData.append("media", file.fileBlob);

            dispatch(uploadMedia(formData))
        }
    }
    const deleteCallback = (id: string) => {
        if(project) dispatch(deleteMedia({idMedia: id, projectId: project.id}))
    }

    useEffect(() => {
        if(project) {
            const query = {
                projectId: project.id,
                skip: 0,
                limit: 10,
            }
            dispatch(getMedia(query))
        }
    }, [project]);

    return (
        <ProjectPage>

            <Page>

                <Sidebar/>

                <ContentPage>

                    <HeaderPage>

                        <Title level={2}>
                            Команда
                        </Title>

                        <MediaFileUpload
                            uploadCallback={uploadCallback}
                            accept={[
                                "image/png",
                                "image/jpeg",
                                "image/webp",
                                "image/svg+xml",
                                "video/mp4",
                                "video/quicktime",
                                "video/webm",
                                "text/plain",
                                "application/pdf",
                                "application/xml",
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            ]}
                            maxSize={5 * 1024 * 1024}
                            maxCountFiles={9}
                        />

                    </HeaderPage>

                    <Content>

                        {user && project &&
                            <Media
                                media={media}
                                user={user}
                                project={project}
                                deleteCallback={deleteCallback}
                            />
                        }

                    </Content>

                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default ProjectMedia;