import React, {FC, useState} from 'react';
import classes from "./TeamUser.module.scss";
import {BasicUserInfo} from "../../store/types/UserType";
import deleteIcon from "../../assets/images/dump_icon.svg"
import editIcon from "../../assets/images/edit-icon.svg"
import Logo from "../Logo/Logo";
import Button from "../../Elements/Button/Button";
import ModalBackdrop from "../ModalBackdrop/ModalBackdrop";
import ModalConfirmAction from "../Modals/ModalConfirmAction/ModalConfirmAction";

export type DeleteCallbackType = (id: string) => void;
export type ChangeAdminCallbackType = (id: string) => void;

interface TeamUserProps {
    user: BasicUserInfo;
    isAdmin?: boolean;
    showDelete?: boolean;
    deleteCallback: DeleteCallbackType;
    changeAdminCallback: ChangeAdminCallbackType;
}

export const typeUserName = {
    "customer": "Замовник",
    "smm_manager": "SMM-Менеджер",
    "targetologist": "Таргетолог",
    "designer": "Дизайнер",
}

const TeamUser:FC<TeamUserProps> = ({user, isAdmin, showDelete, deleteCallback, changeAdminCallback}) => {
    const {id, typeUser,  name, surname, email, phone, telegram, photo} = user;
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [changeAdmin, setChangeAdmin] = useState<boolean>(false)

    /* Delete Modal Func */
    const showDeleteModal = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setDeleteModal(true)
    }
    const closeDeleteModal = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setDeleteModal(false)
    }
    const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setDeleteModal(false);
        deleteCallback(id);
    }

    /* Change Admin Func */
    const showChangeAdmin = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setChangeAdmin(true)
    }
    const closeChangeAdmin = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setChangeAdmin(false)
    }
    const confirmChangeAdmin = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setChangeAdmin(false)
        changeAdminCallback(id);
    }
    return (
        <div className={classes.container}>

            <div className={classes.userInfo}>

                <span className={classes.typeUser}>
                    {typeUserName[typeUser]} {isAdmin ? "(Адміністратор)" : ""}
                </span>

                <Logo photo={photo} colorBorder={"var(--Color-Dark)"}/>

                <div className={classes.contacts}>

                    <span className={classes.name}>
                        {name} {surname}
                    </span>

                    <a href={`tel:${phone}`} className={classes.link}>
                        {phone}
                    </a>

                    <a href={`mailto:${email}`} className={classes.link}>
                        {email}
                    </a>

                    <a href={telegram} className={classes.link}>
                        {telegram}
                    </a>

                </div>

            </div>

            <div className={classes.buttons}>

                {(!isAdmin && showDelete) &&
                    <>
                        <Button
                            text={"Видалити"}
                            onClick={showDeleteModal}
                            icon={deleteIcon}
                            buttonColor={"var(--Color-Grey)"}
                            iconColor={"var(--Color-Red)"}
                            textColor={"var(--Color-Dark)"}
                        />
                        <Button
                            text={"Зробити адміністратором"}
                            onClick={showChangeAdmin}
                            icon={editIcon}
                            buttonColor={"var(--Color-Grey)"}
                            iconColor={"var(--Color-Blue)"}
                            textColor={"var(--Color-Dark)"}
                        />
                    </>
                }

            </div>

            <ModalBackdrop isOpen={deleteModal}>
                <ModalConfirmAction
                    text={"Ви впевнені що хочете видалити юзера з команди?"}
                    onCancel={closeDeleteModal}
                    onConfirm={confirmDelete}
                />
            </ModalBackdrop>

            <ModalBackdrop isOpen={changeAdmin}>
                <ModalConfirmAction
                    text={"Ви впевнені що хочете передати права адміністратора цьому юзеру?"}
                    onCancel={closeChangeAdmin}
                    onConfirm={confirmChangeAdmin}
                />
            </ModalBackdrop>

        </div>
    );
};

export default TeamUser;