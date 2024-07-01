import React, {FC, useEffect, useState} from 'react';
import classes from "./TeamUser.module.scss";
import {BasicUserInfo} from "../../store/types/UserType";
import deleteIcon from "../../assets/images/dump_icon.svg";
import editIcon from "../../assets/images/edit-icon.svg";
import changeRoleIcon from "../../assets/images/icon-change-user.svg";
import exitIcon from "../../assets/images/exit-icon.svg";
import Logo from "../Logo/Logo";
import Button from "../../Elements/Button/Button";
import Backdrop from "../Backdrop/Backdrop";
import ModalConfirmAction from "../Modals/ModalConfirmAction/ModalConfirmAction";
import {RoleType} from "../../store/types/RoleType";
import {rolesList} from "../../constants/rolesList";
import ModalSelect from "../Modals/ModalSelect/ModalSelect";
import { useNavigate } from 'react-router-dom';

export type DeleteCallbackType = (id: string) => void;
export type ChangeAdminCallbackType = (id: string) => void;
export type ChangeRoleCallbackType = (id: string, role: string) => void;
export type LeaveCallbackType = (id: string) => void;

interface TeamUserProps {
    user: BasicUserInfo;
    currentUser: BasicUserInfo;
    role: RoleType;
    isAdmin?: boolean;
    showButtons?: boolean;
    deleteCallback: DeleteCallbackType;
    changeAdminCallback: ChangeAdminCallbackType;
    changeRoleCallback: ChangeRoleCallbackType;
    leaveCallback: LeaveCallbackType;
}

const TeamUser:FC<TeamUserProps> = ({user, currentUser, isAdmin, role, showButtons, deleteCallback, changeAdminCallback, changeRoleCallback, leaveCallback}) => {
    const navigate = useNavigate()
    const {id,  name, surname, email, phone, telegram, photo} = user;
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [changeAdmin, setChangeAdmin] = useState<boolean>(false)
    const [roleModal, setRoleModal] = useState<boolean>(false)
    const [leaveModal, setLeaveModal] = useState<boolean>(false)
    const [changeRole, setChangeRole] = useState<string>(role)
    const [roleLabel, setRoleLabel] = useState<string>("")

    /* Delete Modal Func */
    const showDeleteModal = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setDeleteModal(true)
    }
    const closeDeleteModal = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setDeleteModal(false)
    }
    const confirmDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setDeleteModal(false);
        deleteCallback(id);
    }

    /* Change Admin Func */
    const showChangeAdmin = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setChangeAdmin(true)
    }
    const closeChangeAdmin = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setChangeAdmin(false)
    }
    const confirmChangeAdmin = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setChangeAdmin(false)
        changeAdminCallback(id);
    }

    /* Change Role Func */
    const showChangeRole = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setRoleModal(true);
    }
    const hideChangeRoleCallback = (): void => {
        setRoleModal(false)
    }
    const changeRoleHandler = (value: string): void => {
        setChangeRole(value)
    }
    const confirmChangeRole = (): void => {
        setRoleModal(false)
        changeRoleCallback(id, changeRole);
    }

    /* Change Admin Func */
    const showLeaveModal =  (e: React.MouseEvent<HTMLButtonElement>): void => {
        setLeaveModal(true)
    }
    const hideLeaveModal = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setLeaveModal(false)
    }
    const confirmLeave = (e: React.MouseEvent<HTMLButtonElement>): void => {
        leaveCallback(id)
        setLeaveModal(false);
        navigate('/projects')
    }

    useEffect(() => {
        const currentRole = rolesList.find(item => item.value === role);
        if(currentRole) setRoleLabel(currentRole.label)
    }, [role]);

    return (
        <div className={classes.container}>

            <div className={classes.userInfo}>

                <span className={classes.roleUser}>
                    {roleLabel} {isAdmin ? "(Адміністратор)" : ""}
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

                {showButtons &&
                    <>
                        <Button
                            text={"Змінити роль юзера"}
                            onClick={showChangeRole}
                            icon={changeRoleIcon}
                            buttonColor={"var(--Color-Grey)"}
                            iconColor={"var(--Color-Yellow)"}
                            textColor={"var(--Color-Dark)"}
                        />

                        {!isAdmin &&
                            <>
                                <Button
                                    text={"Зробити адміністратором"}
                                    onClick={showChangeAdmin}
                                    icon={editIcon}
                                    buttonColor={"var(--Color-Grey)"}
                                    iconColor={"var(--Color-Blue)"}
                                    textColor={"var(--Color-Dark)"}
                                />

                                <Button
                                    text={"Видалити"}
                                    onClick={showDeleteModal}
                                    icon={deleteIcon}
                                    buttonColor={"var(--Color-Grey)"}
                                    iconColor={"var(--Color-Red)"}
                                    textColor={"var(--Color-Dark)"}
                                />

                            </>
                        }

                    </>
                }

                {currentUser.id === user.id &&
                    <Button
                        text={"Покинути проєкт"}
                        onClick={showLeaveModal}
                        icon={exitIcon}
                        buttonColor={"var(--Color-Grey)"}
                        iconColor={"var(--Color-Light-Grey-Blue)"}
                        textColor={"var(--Color-Dark)"}
                    />
                }

            </div>

            {showButtons &&
                <>
                    <Backdrop isOpen={roleModal}>
                        <ModalSelect
                            text={"Ви впевнені що хочете змінити роль цьому юзеру?"}
                            options={rolesList}
                            value={changeRole}
                            changeCallback={changeRoleHandler}
                            hideCallback={hideChangeRoleCallback}
                            confirmCallback={confirmChangeRole}
                            confirmText={"Змінити"}
                        />
                    </Backdrop>

                    {!isAdmin &&
                        <>
                            <Backdrop isOpen={changeAdmin}>
                                <ModalConfirmAction
                                    text={"Ви впевнені що хочете передати права адміністратора цьому юзеру?"}
                                    onCancel={closeChangeAdmin}
                                    onConfirm={confirmChangeAdmin}
                                />
                            </Backdrop>

                            <Backdrop isOpen={deleteModal}>
                                <ModalConfirmAction
                                    text={"Ви впевнені що хочете видалити юзера з команди?"}
                                    onCancel={closeDeleteModal}
                                    onConfirm={confirmDelete}
                                />
                            </Backdrop>
                        </>
                    }
                </>
            }

            {currentUser.id === user.id &&
                <Backdrop isOpen={leaveModal}>
                    <ModalConfirmAction
                        text={"Ви впевнені що хочете вийти з проєкту?"}
                        onCancel={hideLeaveModal}
                        onConfirm={confirmLeave}
                    />
                </Backdrop>
            }

        </div>
    );
};

export default TeamUser;