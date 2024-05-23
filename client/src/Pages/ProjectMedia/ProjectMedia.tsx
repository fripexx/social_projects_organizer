import React, {FC, useEffect, useState} from 'react';
import ProjectPage from "../../HOC/ProjectPage/ProjectPage";
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Content from "../../Components/Content/Content";
import MediaFileUpload from "../../Components/MediaFileUpload/MediaFileUpload";
import Media from "../../Components/Media/Media";
import {PreviewFileType} from "../../Components/PreviewFile/PreviewFile";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {deleteMedia, getMedia, QueryMedia, uploadMedia} from "../../store/thunks/ProjectMediaThunks";
import Tabs from "./Components/Tabs/Tabs";
import {useSearchParams} from "react-router-dom";
import {setMedia} from "../../store/reducers/ProjectMediaSlice";
import LoadMore from "../../Components/LoadMore/LoadMore";
import classes from "./ProjectMedia.module.scss";
import Loader from "../../Elements/Loader/Loader";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";

const ProjectMedia:FC = () => {
    const dispatch = useAppDispatch();
    const project = useAppSelector(state => state.ProjectReducer.project);
    const user = useAppSelector(state => state.UserReducer.user)
    const isLoading = useAppSelector(state => state.ProjectMediaReducer.isLoading);
    const media = useAppSelector(state => state.ProjectMediaReducer.media);
    const totalMedia = useAppSelector(state => state.ProjectMediaReducer.totalCount)
    const [query, setQuery] = useState<QueryMedia>();
    const [searchParams, setSearchParams] = useSearchParams();

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
    const loadMore = () => {
        setQuery(prevState => {
            if(prevState) {
                return {
                    ...prevState,
                    skip: prevState.skip + prevState.limit
                }
            }
            return prevState
        })
    }

    useEffect(() => {
        if(project) {
            const query: QueryMedia = {
                projectId: project.id,
                skip: 0,
                limit: 28
            }

            const type = searchParams.get('type');
            if(type) query['type'] = [type]
            dispatch(setMedia([]))
            setQuery(query)
        }
    }, [project, searchParams]);

    useEffect(() => {
        if(query) dispatch(getMedia(query))
    }, [query]);
    console.log(isLoading)
    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

                <ContentPage>

                    <HeaderPage className={classes.header}>

                        <Tabs/>

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

                        {isLoading ? (
                            <Loader type={"relative"} />
                        ) : (
                            <>
                                {user && project && (
                                    <Media
                                        media={media}
                                        user={user}
                                        project={project}
                                        deleteCallback={deleteCallback}
                                    />
                                )}

                                <LoadMore
                                    callback={loadMore}
                                    total={totalMedia}
                                    shown={media.length}
                                    load={false}
                                />
                            </>
                        )}


                    </Content>

                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default ProjectMedia;