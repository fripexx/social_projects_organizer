import React, {FC, useEffect, MouseEvent} from 'react';
import classes from "./AddPostModal.module.scss";
import {useAppSelector} from "../../../../store/hooks/redux";
import {useNavigate} from "react-router-dom";
import Select, {SelectOption} from "../../../../Elements/Select/Select";
import Modal from "../../../../Components/Modals/Modal/Modal";
import Backdrop from "../../../../Components/Backdrop/Backdrop";
import Button from "../../../../Elements/Button/Button";

interface AddPostModalProps {
    open: boolean;
}

const AddPostModal: FC<AddPostModalProps> = ({open}) => {
    const project = useAppSelector(state => state.ProjectReducer.project)
    const socialOptions: SelectOption[] = [
        {
            value: "instagram",
            label: "Instagram",
        },
        {
            value: "tiktok",
            label: "TikTok",
        },
    ]
    const instagramTypesOptions: SelectOption[] = [
        {
            value: "publication",
            label: "Публікація",
        },
        {
            value: "stories",
            label: "Stories",
        },
        {
            value: "reels",
            label: "Reels",
        }
    ]
    const tikTokTypesOptions: SelectOption[] = [
        {
            value: "publication",
            label: "Публікація",
        },
        {
            value: "stories",
            label: "Stories",
        },
    ]
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
        <Backdrop isOpen={open}>

            <Modal className={classes.modal}>

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