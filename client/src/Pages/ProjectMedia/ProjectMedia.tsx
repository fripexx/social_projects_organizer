import React, {FC, useEffect} from 'react';
import classes from "./ProjectMedia.module.scss";
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Content from "../../Components/Content/Content";
import MediaFileUpload from "../../Components/MediaFileUpload/MediaFileUpload";
import Media from "../../Components/Media/Media";
import Loader from "../../Elements/Loader/Loader";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";
import Tabs from "./Components/Tabs/Tabs";
import Pagination from "../../Components/Pagination/Pagination";
import {useSearchParams} from "react-router-dom";
import {deleteMedia, getMedia, uploadMedia} from "../../store/thunks/ProjectMediaThunks";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {setActiveIndexSlider, setFilesInSlider} from "../../store/reducers/UISlice";
import {setMedia} from "../../store/reducers/ProjectMediaSlice";
import {PreviewFileType} from "../../Components/PreviewFile/PreviewFile";
import {QueryMediaRequestType} from "../../api/types/ProjectMediaTypes";
import {setQuery} from "../../store/reducers/ProjectMediaSlice";

const ProjectMedia:FC = () => {
    const dispatch = useAppDispatch();

    const project = useAppSelector(state => state.ProjectReducer.project);
    const user = useAppSelector(state => state.UserReducer.user)
    const isLoading = useAppSelector(state => state.ProjectMediaReducer.isLoading);
    const media = useAppSelector(state => state.ProjectMediaReducer.media);
    const query = useAppSelector(state => state.ProjectMediaReducer.query);
    const totalMedia = useAppSelector(state => state.ProjectMediaReducer.totalCount)

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
    const openHandler = (id: string) => {
        let activeIndex = 0

        media.find((file, index) => file.id === id ? activeIndex = index : activeIndex = 0);

        dispatch(setActiveIndexSlider(activeIndex))
        dispatch(setFilesInSlider(media))
    }
    const changePage = (page: number) => {
        if(query?.limit) dispatch(setQuery({...query, skip: query.limit * (page - 1)}));
    }


    useEffect(() => {
        if(project && query == null) {
            const query: QueryMediaRequestType = {
                projectId: project.id,
                skip: 0,
                limit: 21
            }

            const type = searchParams.get('type');
            if(type) query['type'] = [type]

            dispatch(setMedia([]))
            dispatch(setQuery(query))
        }
    }, [project, searchParams]);
    useEffect(() => {
        if(query) dispatch(getMedia(query))
    }, [query]);

    return (
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
                            "video/mov",
                            "text/plain",
                            "application/pdf",
                            "application/xml",
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ]}
                        maxSize={15 * 1024 * 1024}
                        maxCountFiles={9}
                    />

                </HeaderPage>

                <Content className={classes.content}>

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
                                    openCallback={openHandler}
                                />
                            )}

                            {query &&
                                <Pagination
                                    className={classes.pagination}
                                    limit={query.limit || 0}
                                    total={totalMedia}
                                    currentPage={Math.floor(query.skip  / (query.limit || 1)) + 1}
                                    siblings={1}
                                    onPageChange={changePage}
                                />
                            }
                        </>
                    )}

                </Content>

            </ContentPage>

        </Page>
    );
};

export default ProjectMedia;