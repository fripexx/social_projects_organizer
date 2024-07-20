import React, {FC, useEffect, useState} from 'react';
import classes from "./ProjectPosts.module.scss";
import plusIcon from "../../assets/images/plus_icon.svg";
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
import {useSearchParams} from "react-router-dom";
import {GetPostsRequestType} from "../../api/types/PostServiceTypes";
import {PostStatus} from "../../store/reducers/PostStatus";

const ProjectPosts:FC = () => {
    const dispatch = useAppDispatch();
    const project = useAppSelector(state => state.ProjectReducer.project)
    const posts = useAppSelector(state => state.ProjectReducer.posts)
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState<GetPostsRequestType | undefined>();

    useEffect(() => {
        if(project) {
            setQuery({
                project: project.id,
                skip: 0,
                limit: 15,
                social: "instagram",
                typePost: "publication",
            })
        }
    }, [project]);
    useEffect(() => {
        if(query) dispatch(getPosts(query))
    }, [query]);
    useEffect(() => {
        if(searchParams) {
            const status = searchParams.get("status") as PostStatus;

            if(status) {
                setQuery(prevState => prevState ? {...prevState, status} : prevState);
            }
        }
    }, [searchParams]);

    return (
        <Page>

            <SidebarProject/>

            <ContentPage>

                <HeaderPage>

                    <StatusTabs/>

                    <Button
                        text={"Додати"}
                        icon={plusIcon}
                        iconColor={"var(--Color-Green)"}
                        style={{marginLeft: "auto"}}
                        onClick={() => {}}
                    />

                </HeaderPage>

                <Content>
                    <div className={classes.postsContainer}>
                        {posts.map(post => {
                            return(
                                <PostItem
                                    key={post.id}
                                    post={post}
                                />
                            )
                        })}
                    </div>
                </Content>

            </ContentPage>

        </Page>
    );
};

export default ProjectPosts;