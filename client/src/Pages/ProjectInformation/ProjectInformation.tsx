import React, {FC, useEffect, useState} from 'react';
import classes from "./ProjectInformation.module.scss";
import ProjectPage from "../../HOC/ProjectPage/ProjectPage";
import Page from "../../Components/Page/Page";
import SidebarProject from "../../Components/SidebarProject/SidebarProject";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Content from "../../Components/Content/Content";
import Title from "../../Elements/Title/Title";
import DocumentCard from "../../Components/DocumentCard/DocumentCard";
import Button from "../../Elements/Button/Button";
import ModalSetDocument from "./Components/ModalSetDocument/ModalSetDocument";
import ModalConfirmAction from "../../Components/Modals/ModalConfirmAction/ModalConfirmAction";
import Backdrop from "../../Components/Backdrop/Backdrop";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {deleteDocument, getDocuments, setDocument} from "../../store/thunks/ProjectThunks";
import plusIcon from "../../assets/images/icons/plus-icon.svg";


const ProjectInformation:FC = () => {
    const dispatch = useAppDispatch();

    const project = useAppSelector(state => state.ProjectReducer.project);
    const user = useAppSelector(state => state.UserReducer.user);
    const documents = useAppSelector(state => state.ProjectReducer.documents);

    const [docModal, setDocModal] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [deleteDoc, setDeleteDoc] = useState<string>("");

    const closeDocModal = () => {
        setDocModal(false);
    }
    const confirmSetDocHandler = (name: string, file: File) => {
        if (isAdmin && project) {
            const formData = new FormData();

            formData.append("projectId", project.id);
            formData.append("name", name);
            if (file) formData.append("file", file);

            dispatch(setDocument(formData))
        }

        closeDocModal();
    }
    const deleteHandler = (id: string) => {
        if (isAdmin) setDeleteDoc(id);
    }
    const confirmDeleteHandler = () => {
        if (isAdmin) {
            dispatch(deleteDocument(deleteDoc));
            setDeleteDoc("");
        }
    }

    useEffect(() => {
        if (project) dispatch(getDocuments(project.id))
    }, [project]);
    useEffect(() => {
        if (project && user && project.administrator === user.id) setIsAdmin(true)
    }, [project, user]);

    return (
        <ProjectPage>

            <Page>

                <SidebarProject/>

                <ContentPage>

                    <HeaderPage>

                        <Title level={2}>
                            Інформація
                        </Title>

                        {isAdmin &&
                            <Button
                                text={"Додати документ"}
                                icon={plusIcon}
                                iconColor={"var(--Color-Green)"}
                                style={{marginLeft: "auto"}}
                                onClick={() => setDocModal(true)}
                            />
                        }

                    </HeaderPage>

                    <Content>

                        {documents.length > 0 &&
                            <div className={classes.documents}>
                                {documents.map(document => {
                                    return(
                                        <DocumentCard
                                            key={document.id}
                                            document={document}
                                            deleteCallback={deleteHandler}
                                            isAdmin={isAdmin}
                                        />
                                    )
                                })}
                            </div>
                        }

                        {documents.length === 0 &&
                            <p>Поки що не додано жодного документа.</p>
                        }

                    </Content>

                </ContentPage>

                <ModalSetDocument
                    isOpen={docModal}
                    accept={['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                    closeCallback={closeDocModal}
                    confirmCallback={confirmSetDocHandler}
                />

                <Backdrop isOpen={!!deleteDoc} clickCallback={() => setDeleteDoc("")}>
                    <ModalConfirmAction
                        text={"Ви впевнені що хочете видалити цей документ?"}
                        onCancel={() => setDeleteDoc("")}
                        onConfirm={confirmDeleteHandler}
                    />
                </Backdrop>

            </Page>

        </ProjectPage>
    );
};

export default ProjectInformation;