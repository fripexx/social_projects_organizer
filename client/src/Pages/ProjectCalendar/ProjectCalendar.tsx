import React, {useEffect, useState} from 'react';
import classes from "./ProjectCalendar.module.scss";
import ProjectPage from "../../HOC/ProjectPage/ProjectPage";
import Page from "../../Components/Page/Page";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Content from "../../Components/Content/Content";
import Calendar, {CalendarItem} from "../../Components/Calendar/Calendar";
import {PostType} from "../../store/types/PostType";
import PostService from "../../api/services/PostService";
import {PostsQueryType} from "../../store/types/PostsQueryType";
import {useAppSelector} from "../../store/hooks/redux";
import PostItem from "../../Components/PostItem/PostItem";
import CalendarControl from "../../Components/Calendar/Components/CalendarControl/CalendarControl";


const ProjectCalendar = () => {
    const project = useAppSelector(state => state.ProjectReducer.project);

    const [date, setDate] = useState<Date>(new Date());
    const [posts, setPosts] = useState<PostType[]>([]);
    const [calendarCollection, setCalendarCollection] = useState<CalendarItem[]>([]);

    const changeMonth = (offset: number) => {
        const newDate = new Date(date.setMonth(date.getMonth() + offset));
        setDate(newDate);
    };

    useEffect(() => {
        if(project) {
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const isoStartOfMonth = startOfMonth.toISOString();
            const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const isoEndOfMonth = endOfMonth.toISOString();
            const data:PostsQueryType = {
                project: project.id,
                skip: 0,
                datePublish: {
                    from: isoStartOfMonth,
                    to: isoEndOfMonth,
                }
            }

            PostService.getPosts(data)
                .then((response) => {
                    setPosts(response.posts)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [project, date]);
    useEffect(() => {
        setCalendarCollection(posts.map(post => {
            return {
                date: post.datePublish,
                component: <PostItem post={post} compact={true}/>
            }
        }))
    }, [posts]);

    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

                <ContentPage>

                    <HeaderPage>
                        <CalendarControl date={date} changeMonth={changeMonth}/>
                    </HeaderPage>

                    <Content>
                        <Calendar date={date} items={calendarCollection}/>
                    </Content>

                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default ProjectCalendar;