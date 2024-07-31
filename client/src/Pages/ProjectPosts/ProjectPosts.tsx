import React, {FC, useEffect, useState} from 'react';
import classes from "./ProjectPosts.module.scss";
import plusIcon from "../../assets/images/plus_icon.svg";
import {PostStatus} from "../../store/reducers/PostStatus";
import PostService from "../../api/services/PostService";
import {setLoadMorePosts, setPostsQuery} from "../../store/reducers/ProjectSlice";
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
import LoadMore from "../../Components/LoadMore/LoadMore";

const ProjectPosts:FC = () => {
    const dispatch = useAppDispatch();

    const project = useAppSelector(state => state.ProjectReducer.project)
    const {total, posts, query} = useAppSelector(state => state.ProjectReducer.postsData)

    const [searchParams, setSearchParams] = useSearchParams();
    const [addPostOpen, setAddPostOpen] = useState<boolean>(false);
    const [loadMore, setLoadMore] = useState<boolean>(false);

    const changeSocialHandler = (value: string) => {
        if((value === "instagram" || value === "tiktok") && query) {
            dispatch(setPostsQuery({...query, social: value}))
        }
    }
    const closeAddModal = () => {
        setAddPostOpen(false)
    }

    useEffect(() => {
        if(project) {
            dispatch(setPostsQuery({
                ...query,
                project: project.id,
                skip: 0,
                limit: 20,
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
    useEffect(() => {
        async function fetchLoadMore() {
            if (loadMore && query) {
                const loadMoreData = await PostService.getPosts({...query, skip: posts.length})
                dispatch(setLoadMorePosts(loadMoreData.posts))
                setLoadMore(false);
            }
        }
        fetchLoadMore();
    }, [loadMore]);

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

                <Content>
                    <div className={classes.postsContainer}>
                        {posts.map(post => {
                            return(
                                <PostItem key={post.id} post={post}/>
                            )
                        })}
                    </div>

                    <LoadMore
                        load={loadMore}
                        text={"Показати ще"}
                        shown={posts.length}
                        total={total}
                        callback={() => setLoadMore(true)}
                    />

                </Content>

                <AddPostModal open={addPostOpen} closeCallback={closeAddModal}/>

            </ContentPage>

        </Page>
    );
};

export default ProjectPosts;