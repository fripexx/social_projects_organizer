import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {useParams} from "react-router-dom";
import {getNotesProject} from "../../store/thunks/ProjectThunks";
import plusIcon from "../../assets/images/plus_icon.svg";
import ProjectPage from "../../HOC/ProjectPage/ProjectPage";
import Page from "../../Components/Page/Page";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Button from "../../Elements/Button/Button";
import Content from "../../Components/Content/Content";
import Title from "../../Elements/Title/Title";
import Notes from "../../Components/Notes/Notes";


const ProjectNotes:FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const notes = useAppSelector(state => state.ProjectReducer.notes);

    useEffect(() => {
        if(id) dispatch(getNotesProject(id));
    }, [dispatch, id]);

    return (
        <ProjectPage>

            <Page>

                <Sidebar/>

                <ContentPage>

                    <HeaderPage>

                        <Title level={2}>
                            Нотатки
                        </Title>

                        <Button
                            text={"Додати"}
                            icon={plusIcon}
                            iconColor={"var(--Color-Green)"}
                            style={{marginLeft: "auto"}}
                            onClick={() => {}}
                        />

                    </HeaderPage>

                    <Content>

                        {notes.length !== 0 &&
                            <Notes
                                notes={notes}
                                changeCallback={() => {}}
                                deleteCallback={() => {}}
                                showPhoto={true}
                            />
                        }

                        { notes.length === 0 &&
                            <p>Поки що тут порожньо. Почніть з додавання своїх нотаток зараз!</p>
                        }

                    </Content>

                </ContentPage>

            </Page>

        </ProjectPage>
    );
};

export default ProjectNotes;