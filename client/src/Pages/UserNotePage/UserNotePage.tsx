import React, {FC, useState, useEffect} from 'react';
import classes from "./UserNotePage.module.scss";
import plusIcon from "../../assets/images/plus_icon.svg";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {addNoteUser, getNotesUser, deleteNoteUser, changeNoteUser} from "../../store/thunks/UserThunks";
import Page from "../../Components/Page/Page";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ContentPage from "../../Components/ContentPage/ContentPage";
import Title from "../../Elements/Title/Title";
import Button from "../../Elements/Button/Button";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Content from "../../Components/Content/Content";
import Notes from "../../Components/Notes/Notes";
import ModalBackdrop from "../../Components/ModalBackdrop/ModalBackdrop";
import ModalTextArea from "../../Components/Modals/ModalTextArea/ModalTextArea";
import {ChangeCallback, DeleteCallback} from "../../Components/Note/Note";
import ModalConfirmAction from "../../Components/Modals/ModalConfirmAction/ModalConfirmAction";

const UserNotePage:FC = () => {

    const dispatch = useAppDispatch();
    const notes = useAppSelector(state => state.UserReducer.notes);

    const [addModalSate, setAddModalState] = useState<boolean>(false)
    const [deleteModalSate, setDeleteModalState] = useState<null | string>(null)
    const [textNote, setTextNote] = useState<string>("")

    useEffect(() => {
        dispatch(getNotesUser());
    }, [dispatch]);

    const setChangeInDB: ChangeCallback = (() => {
        let timer: ReturnType<typeof setTimeout>;
        return (noteId, text) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                dispatch(changeNoteUser({noteId, text}));
            }, 1000);
        };
    })();
    const showModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAddModalState(true);
    }
    const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAddModalState(false);
        setTextNote("");
    }
    const onSubmitModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addNoteUser(textNote));
        setAddModalState(false);
        setTextNote("")
    }
    const onChangeTextNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        setTextNote(value);
    }
    const changeCallback: ChangeCallback = (noteId, text): void => {
        setChangeInDB(noteId, text)
    }
    const deleteCallback: DeleteCallback = (noteId):void => {
        setDeleteModalState(noteId);
    }
    const acceptDelete = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(deleteModalSate) {
            dispatch(deleteNoteUser(deleteModalSate));
            setDeleteModalState(null)
            setTimeout(() => {
                document.body.setAttribute('data-backdrop', 'false');
            }, 300)
        }
    }
    const declineDelete = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDeleteModalState(null)
    }

    return (
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
                        onClick={showModal}
                    />

                </HeaderPage>

                <Content>

                    {notes.length !== 0 &&
                        <Notes notes={notes} changeCallback={changeCallback} deleteCallback={deleteCallback}/>
                    }

                    { notes.length === 0 &&
                        <p>Поки що тут порожньо. Почніть з додавання своїх нотаток зараз!</p>
                    }

                </Content>

            </ContentPage>

            <ModalBackdrop isOpen={addModalSate}>
                <ModalTextArea
                    className={classes.modal}
                    text={textNote}
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

        </Page>
    );
};

export default UserNotePage;