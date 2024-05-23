import React, {FC, useEffect, useState} from 'react';
import plusIcon from "../../assets/images/plus_icon.svg";
import ProjectPage from "../../HOC/ProjectPage/ProjectPage";
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Button from "../../Elements/Button/Button";
import Content from "../../Components/Content/Content";
import Title from "../../Elements/Title/Title";
import Notes from "../../Components/Notes/Notes";
import ModalBackdrop from "../../Components/ModalBackdrop/ModalBackdrop";
import ModalConfirmAction from "../../Components/Modals/ModalConfirmAction/ModalConfirmAction";
import ModalTextArea from "../../Components/Modals/ModalTextArea/ModalTextArea";
import {ChangeCallback, DeleteCallback} from "../../Components/Note/Note";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {useParams} from "react-router-dom";
import {getNotesProject} from "../../store/thunks/ProjectThunks";
import {addNoteInProject, deleteNoteInProject, changeNoteInProject} from "../../store/thunks/ProjectThunks";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";

const ProjectNotes:FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const notes = useAppSelector(state => state.ProjectReducer.notes);

    const [addModalSate, setAddModalState] = useState<boolean>(false)
    const [deleteModalSate, setDeleteModalState] = useState<null | string>(null)
    const [textModalNote, setTextModalNote] = useState<string>("")

    useEffect(() => {
        if(id) dispatch(getNotesProject(id));
    }, [dispatch, id]);

    const onChangeTextNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        setTextModalNote(value);
    }
    const changeCallback: ChangeCallback = (noteId, text): void => {
        setChangeInDB(noteId, text)
    }
    const setChangeInDB: ChangeCallback = (() => {
        let timer: ReturnType<typeof setTimeout>;
        return (noteId, text) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if(id) dispatch(changeNoteInProject({idProject: id, idNote: noteId, text}));
            }, 1000);
        };
    })();

    // ADD NOTE FUNC
    const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAddModalState(true);
    }
    const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAddModalState(false);
        setTextModalNote("");
    }
    const onSubmitModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(id) dispatch(addNoteInProject({text: textModalNote, idProject: id }))
        setAddModalState(false);
        setTextModalNote("")
    }

    // DELETE MODAL
    const deleteCallback: DeleteCallback = (noteId):void => {
        setDeleteModalState(noteId);
    }
    const acceptDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(deleteModalSate && id) {
            dispatch(deleteNoteInProject({idNote: deleteModalSate, idProject: id}));
            setDeleteModalState(null)
            setTimeout(() => document.body.setAttribute('data-backdrop', 'false'), 300)
        }
    }
    const declineDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDeleteModalState(null)
    }

    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

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
                            onClick={showModal}
                        />

                    </HeaderPage>

                    <Content>

                        {notes.length !== 0 &&
                            <Notes
                                notes={notes}
                                changeCallback={changeCallback}
                                deleteCallback={deleteCallback}
                                showPhoto={true}
                            />
                        }

                        { notes.length === 0 &&
                            <p>Поки що тут порожньо. Почніть з додавання своїх нотаток зараз!</p>
                        }

                    </Content>

                </ContentPage>

            </Page>

            <ModalBackdrop isOpen={addModalSate}>
                <ModalTextArea
                    // className={classes.modal}
                    text={textModalNote}
                    onChangeText={onChangeTextNote}
                    onConfirm={onSubmitModal}
                    onCancel={closeModal}
                />
            </ModalBackdrop>

            <ModalBackdrop isOpen={!!deleteModalSate}>
                <ModalConfirmAction
                    text={"Ви впевнені що хочете видалити нотатку?"}
                    onCancel={declineDelete}
                    onConfirm={acceptDelete}
                />
            </ModalBackdrop>

        </ProjectPage>
    );
};

export default ProjectNotes;