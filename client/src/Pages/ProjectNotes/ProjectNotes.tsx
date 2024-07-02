import React, {FC, useEffect, useState} from 'react';
import plusIcon from "../../assets/images/plus_icon.svg";
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Button from "../../Elements/Button/Button";
import Content from "../../Components/Content/Content";
import Title from "../../Elements/Title/Title";
import Notes from "../../Components/Notes/Notes";
import Backdrop from "../../Components/Backdrop/Backdrop";
import ModalConfirmAction from "../../Components/Modals/ModalConfirmAction/ModalConfirmAction";
import ModalTextArea from "../../Components/Modals/ModalTextArea/ModalTextArea";
import {ChangeCallback, DeleteCallback} from "../../Components/Note/Note";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {getNotesProject} from "../../store/thunks/ProjectThunks";
import {addNoteInProject, deleteNoteInProject, changeNoteInProject} from "../../store/thunks/ProjectThunks";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";

const ProjectNotes:FC = () => {
    const dispatch = useAppDispatch()
    const projectId = useAppSelector(state => state.ProjectReducer.projectId)
    const notes = useAppSelector(state => state.ProjectReducer.notes);

    const [addModalSate, setAddModalState] = useState<boolean>(false)
    const [deleteModalSate, setDeleteModalState] = useState<null | string>(null)
    const [textModalNote, setTextModalNote] = useState<string>("")

    useEffect(() => {
        if(projectId) dispatch(getNotesProject(projectId));
    }, []);

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
                if(projectId) dispatch(changeNoteInProject({idProject: projectId, idNote: noteId, text}));
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
        if(projectId) dispatch(addNoteInProject({text: textModalNote, idProject: projectId }))
        setAddModalState(false);
        setTextModalNote("")
    }

    // DELETE MODAL
    const deleteCallback: DeleteCallback = (noteId):void => {
        setDeleteModalState(noteId);
    }
    const acceptDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(deleteModalSate && projectId) {
            dispatch(deleteNoteInProject({idNote: deleteModalSate, idProject: projectId}));
            setDeleteModalState(null)
            setTimeout(() => document.body.setAttribute('data-backdrop', 'false'), 300)
        }
    }
    const declineDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDeleteModalState(null)
    }

    return (
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

            <Backdrop isOpen={addModalSate}>
                <ModalTextArea
                    text={textModalNote}
                    onChangeText={onChangeTextNote}
                    onConfirm={onSubmitModal}
                    onCancel={closeModal}
                />
            </Backdrop>

            <Backdrop isOpen={!!deleteModalSate}>
                <ModalConfirmAction
                    text={"Ви впевнені що хочете видалити нотатку?"}
                    onCancel={declineDelete}
                    onConfirm={acceptDelete}
                />
            </Backdrop>

        </Page>

    );
};

export default ProjectNotes;