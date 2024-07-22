import React, {FC, useEffect, useState} from 'react';
import classes from "./ProjectPosts.module.scss";
import plusIcon from "../../assets/images/plus_icon.svg";
import {GetPostsRequestType} from "../../api/types/PostServiceTypes";
import {PostStatus} from "../../store/reducers/PostStatus";
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

const ProjectPosts:FC = () => {
    const dispatch = useAppDispatch();
    const project = useAppSelector(state => state.ProjectReducer.project)
    const posts = useAppSelector(state => state.ProjectReducer.posts)
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState<GetPostsRequestType | undefined>();
    const [addPostOpen, setAddPostOpen] = useState<boolean>(false);

    const changeSocialHandler = (value: string) => {
        if(value === "instagram" || value === "tiktok") {
            setQuery(prevState => (prevState ? {...prevState, social: value} : undefined))
        }
    }
    const closeAddModal = () => {
        setAddPostOpen(false)
    }

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
            } else {
                setQuery(prevState => {
                    if(prevState) {
                        const updateState = {...prevState}
                        delete updateState.status;
                        return updateState
                    }
                    return prevState;
                });
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

                <AddPostModal open={addPostOpen} closeCallback={closeAddModal}/>

            </ContentPage>

        </Page>
    );
};

export default ProjectPosts;