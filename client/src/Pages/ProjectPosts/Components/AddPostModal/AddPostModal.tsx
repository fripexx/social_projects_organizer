import React, {FC, useEffect, MouseEvent} from 'react';
import classes from "./AddPostModal.module.scss";
import {useAppSelector} from "../../../../store/hooks/redux";
import {useNavigate} from "react-router-dom";
import Select, {SelectOption} from "../../../../Elements/Select/Select";
import Modal from "../../../../Components/Modals/Modal/Modal";
import Backdrop from "../../../../Components/Backdrop/Backdrop";
import Button from "../../../../Elements/Button/Button";
import {socialOptions} from "../../constants/SocialOptions";
import {tikTokTypesOptions} from "../../constants/TikTokTypesOptions";
import {instagramTypesOptions} from "../../constants/InstagramTypesOptions";

interface AddPostModalProps {
    open: boolean;
    closeCallback: () => void;
}

const AddPostModal: FC<AddPostModalProps> = ({open, closeCallback}) => {
    const project = useAppSelector(state => state.ProjectReducer.project)
    const navigate = useNavigate();
    const [currentSocial, setCurrentSocial] = React.useState<string>(socialOptions[0].value)
    const [currentType, setCurrentType] = React.useState<string | null>();
    const [typeOptions, setTypeOptions] = React.useState<SelectOption[] | null>();

    useEffect(() => {
        if (currentSocial === "tiktok") {
            setTypeOptions(tikTokTypesOptions);
            setCurrentType(tikTokTypesOptions[0].value)
        }
        if (currentSocial === "instagram") {
            setTypeOptions(instagramTypesOptions);
            setCurrentType(instagramTypesOptions[0].value)
        }
    }, [currentSocial]);

    const changeSocialHandler = (value: string) => {
        setCurrentSocial(value)
    }
    const changeTypeHandler = (value: string) => {
        setCurrentType(value)
    }
    const clickLinkHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (project) navigate(`/project/${project.id}/edit-${currentSocial}-${currentType}`)
    }

    return (
        <Backdrop isOpen={open} clickCallback={closeCallback}>

            <Modal className={classes.modal}>

                <button className={classes.close} onClick={() => closeCallback()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="15px" width="15px" viewBox="0 0 490 490">
                        <polygon
                            points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/>
                    </svg>
                </button>

                <Select
                    label={"Оберіть соціальну мережу"}
                    options={socialOptions}
                    value={currentSocial}
                    onChange={changeSocialHandler}
                    dropdownType={"relative"}
                />

                {typeOptions && currentType &&
                    <Select
                        label={"Оберіть тип посту"}
                        options={typeOptions}
                        value={currentType}
                        onChange={changeTypeHandler}
                        dropdownType={"relative"}
                    />
                }

                {currentSocial && currentType &&
                    <Button
                        className={classes.link}
                        text={"Створити"}
                        onClick={clickLinkHandler}
                    />
                }

            </Modal>

        </Backdrop>
    );
};

export default AddPostModal;