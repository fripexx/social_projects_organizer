import React, {FC} from 'react';
import classes from "./UserSettingsForm.module.scss";
import Field from "../../../../Elements/Field/Field";
import Toggle from "../../../../Elements/Toggle/Toggle";
import {SettingUser} from "../../../../store/types/UserType";

interface UserSettingsFormProps {
    formState: SettingUser,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void,
}

const UserSettingsForm:FC<UserSettingsFormProps> = ({formState, onChange}) => {
    return (
        <form className={classes.form}>

            <div className={classes.formColumn}>

                <Field text={"Нічний режим"}>
                    <Toggle
                        name={"darkMode"}
                        checked={formState.darkMode}
                        onChange={onChange}
                    />
                </Field>

                <Field text={"Push сповіщення"}>
                    <Toggle
                        name={"pushNotifications"}
                        checked={formState.pushNotifications}
                        onChange={onChange}
                    />
                </Field>

            </div>

        </form>
    );
};

export default UserSettingsForm;