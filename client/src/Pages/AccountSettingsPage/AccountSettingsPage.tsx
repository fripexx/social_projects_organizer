import React, {FC, ReactEventHandler, useState} from 'react';
import saveIcon from "../../assets/images/save_icon.svg";
import Page from "../../Components/Page/Page";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ContentPage from "../../Components/ContentPage/ContentPage";
import HeaderPage from "../../Components/HeaderPage/HeaderPage";
import Title from "../../Elements/Title/Title";
import Button from "../../Elements/Button/Button";
import Content from "../../Components/Content/Content";
import AccountSettingsForm from "./Components/AccountSettingsForm/AccountSettingsForm";
import {useAppDispatch, useAppSelector} from "../../store/hooks/redux";
import {FormStateType} from "./types/FormStateType";
import {editSettingsUser} from "../../store/thunks/UserThunks";

const AccountSettingsPage: FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.UserReducer.user);
    const isLoading = useAppSelector(state => state.UserReducer.isLoading);
    const [formState, setFormState] = useState<FormStateType>({
        darkMode: user?.darkMode ? user.darkMode : false,
        pushNotifications: user?.pushNotifications ? user.pushNotifications : false,
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

            <Sidebar/>

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

                    <AccountSettingsForm
                        formState={formState}
                        onChange={onChange}
                    />

                </Content>

            </ContentPage>

        </Page>
    );
};

export default AccountSettingsPage;