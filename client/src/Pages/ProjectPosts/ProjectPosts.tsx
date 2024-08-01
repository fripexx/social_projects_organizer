import React, {FC, useEffect, useState} from 'react';
import classes from "./ProjectPosts.module.scss";
import plusIcon from "../../assets/images/plus_icon.svg";
import {PostStatus} from "../../store/reducers/PostStatus";
import {setPostsQuery} from "../../store/reducers/ProjectSlice";
import {socialOptions} from "./constants/SocialOptions";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {getPosts} from "../../store/thunks/PostThunks";
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Button from "../../Elements/Button/Button";
import Content from "../../Components/Content/Content";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";
import StatusTabs from "./Components/StatusTabs/StatusTabs";
import PostItem from "../../Components/PostItem/PostItem";
import AddPostModal from "./Components/AddPostModal/AddPostModal";
import {useSearchParams} from "react-router-dom";
import Select from "../../Elements/Select/Select";
import Pagination from "../../Components/Pagination/Pagination";

const ProjectPosts:FC = () => {
    const dispatch = useAppDispatch();

    const project = useAppSelector(state => state.ProjectReducer.project)
    const {total, posts, query} = useAppSelector(state => state.ProjectReducer.postsData)

    const [searchParams, setSearchParams] = useSearchParams();
    const [addPostOpen, setAddPostOpen] = useState<boolean>(false);

    const changeSocialHandler = (value: string) => {
        if((value === "instagram" || value === "tiktok") && query) {
            dispatch(setPostsQuery({...query, social: value}))
        }
    }
    const closeAddModal = () => {
        setAddPostOpen(false)
    }
    const changePage = (page: number) => {
        if(query) dispatch(setPostsQuery({...query, skip: query.limit * (page - 1)}))
    }

    useEffect(() => {
        if(project) {
            dispatch(setPostsQuery({
                ...query,
                project: project.id,
                skip: 0,
                limit: 30,
                social: "instagram",
            }))
        }
    }, [project]);
    useEffect(() => {
        if(query) dispatch(getPosts(query))
    }, [query]);
    useEffect(() => {
        if(searchParams && query) {
            const status = searchParams.get("status") as PostStatus;

            if(status) {
                dispatch(setPostsQuery({...query, status}))
            } else {
                const newQuery = {...query}
                delete newQuery.status;
                dispatch(setPostsQuery(newQuery))
            }
        }
    }, [searchParams]);

    return (
        <Page>

            <SidebarProject/>

            <ContentPage>

                <HeaderPage className={classes.header}>

                    <Select
                        className={classes.socialSelect}
                        options={socialOptions}
                        value={query?.social || ""}
                        onChange={changeSocialHandler}
                    />

                    <StatusTabs/>

                    <Button
                        text={"Додати"}
                        icon={plusIcon}
                        iconColor={"var(--Color-Green)"}
                        style={{marginLeft: "auto"}}
                        onClick={() => setAddPostOpen(true)}
                    />

                </HeaderPage>

                <Content className={classes.content}>

                    <div className={classes.postsContainer}>
                        {posts.map(post => {
                            return(
                                <PostItem key={post.id} post={post}/>
                            )
                        })}
                    </div>

                    {query &&
                        <Pagination
                            className={classes.pagination}
                            limit={query.limit}
                            total={total}
                            currentPage={Math.floor(query.skip  / query.limit) + 1}
                            siblings={1}
                            onPageChange={changePage}
                        />
                    }

                </Content>

                <AddPostModal open={addPostOpen} closeCallback={closeAddModal}/>

            </ContentPage>

        </Page>
    );
};

export default ProjectPosts;