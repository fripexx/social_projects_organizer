import React, {FC} from 'react';
import classes from "./ModalAddUser.module.scss";
import {rolesList} from "../../../../constants/rolesList";
import Backdrop from "../../../../Components/Backdrop/Backdrop";
import Input from "../../../../Elements/Input/Input";
import Modal from "../../../../Components/Modals/Modal/Modal";
import Select from "../../../../Elements/Select/Select";
import Button from "../../../../Elements/Button/Button";

interface ModalAddUserProps {
    isOpen: boolean;
    email: string;
    setEmailCallback: (email: string) => void;
    role: string;
    setRoleCallback: (role: string) => void;
    addUserCallback: () => void;
    hideCallback: () => void
}

const ModalAddUser: FC<ModalAddUserProps> = ({isOpen, email, setEmailCallback, role, setRoleCallback, hideCallback, addUserCallback}) => {
    return (
        <Backdrop isOpen={isOpen} clickCallback={hideCallback}>
            <Modal className={classes.modal}>

                <Select
                    label={"Оберіть роль в проєкті для юзера"}
                    options={rolesList}
                    value={role}
                    onChange={setRoleCallback}
                    dropdownType={"relative"}
                />

                <Input
                    type={"email"}
                    label={"Введіть пошту юзера"}
                    placeholder={"Email"}
                    value={email}
                    onChange={(e) => setEmailCallback(e.currentTarget.value)}
                />

                <footer className={classes.footer}>

                    <Button
                        text={"Закрити"}
                        onClick={hideCallback}
                        buttonColor={"var(--Color-Light-Grey-Blue)"}
                        textColor={"var(--Color-Dark)"}

                    />

                    <Button
                        text={"Додати"}
                        onClick={addUserCallback}
                    />

                </footer>

            </Modal>
        </Backdrop>
    );
};

export default ModalAddUser;