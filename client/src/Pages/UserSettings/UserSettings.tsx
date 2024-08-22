import React, {FC, useState} from 'react';
import saveIcon from "../../assets/images/save_icon.svg";
import Page from "../../Components/Page/Page";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Title from "../../Elements/Title/Title";
import Button from "../../Elements/Button/Button";
import Content from "../../Components/Content/Content";
import UserSettingsForm from "./Components/UserSettingsForm/UserSettingsForm";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {editSettingsUser} from "../../store/thunks/UserThunks";
import SidebarUser from "../../Components/SidebarUser/SidebarUser";
import {SettingUser} from "../../store/types/UserType";

const UserSettings: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.UserReducer.user);
    const [formState, setFormState] = useState<SettingUser>({
        darkMode: user?.darkMode || false,
        pushNotifications: user?.pushNotifications || false,
    })
    const [saveState, setSaveState] = useState<boolean>(false);

    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const checked: boolean = e.currentTarget.checked;
        const name: string = e.currentTarget.name;

        setFormState(prevState => ({...prevState, [name]: checked}))
        setSaveState(true);
    }
    const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch(editSettingsUser(formState));
        setSaveState(false);
    }

    return (
        <Page>

            <SidebarUser/>

            <ContentPage>

                <HeaderPage>

                    <Title level={2}>
                        Налаштування
                    </Title>

                    {saveState &&
                        <Button
                            text={"Зберегти"}
                            icon={saveIcon}
                            iconColor={"var(--Color-Green)"}
                            style={{marginLeft: "auto"}}
                            onClick={onSubmit}
                        />
                    }

                </HeaderPage>

                <Content>

                    <UserSettingsForm
                        formState={formState}
                        onChange={onChange}
                    />

                </Content>

            </ContentPage>

        </Page>
    );
};

export default UserSettings;