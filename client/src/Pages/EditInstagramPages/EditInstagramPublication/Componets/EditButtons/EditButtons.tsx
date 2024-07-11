import React, {FC, useEffect, useState} from 'react';
import EditPostButtons, {EditPostButton} from "../../../../../Components/EditPostComponents/EditPostButtons/EditPostButtons";
import {
    confirmAdminButtons,
    confirmButtons, editAdminButtons,
    editButtons,
    pendingAdminButtons,
    pendingButtons, rejectedAdminButtons,
    rejectedButtons,
    unpublishButtons
} from "../../../constants/editButtons";
import {PostStatus} from "../../../../../store/reducers/PostStatus";

interface EditButtonsProps {
    status: PostStatus | undefined;
    isAdmin: boolean;
    callback: (key: string) => void;
    className?: string;
}

const EditButtons: FC<EditButtonsProps> = ({status, isAdmin = false, callback, className}) => {
    const [buttons, setButtons] = useState<EditPostButton[]>(unpublishButtons)

    useEffect(() => {
        if(status) {
            if(isAdmin) {
                switch (status) {
                    case "edit":
                        setButtons(editAdminButtons)
                        break;
                    case "pending":
                        setButtons(pendingAdminButtons)
                        break;
                    case "rejected":
                        setButtons(rejectedAdminButtons)
                        break;
                    case "confirmed":
                        setButtons(confirmAdminButtons)
                        break;
                }
            } else {
                switch (status) {
                    case "edit":
                        setButtons(editButtons)
                        break;
                    case "pending":
                        setButtons(pendingButtons)
                        break;
                    case "rejected":
                        setButtons(rejectedButtons)
                        break;
                    case "confirmed":
                        setButtons(confirmButtons)
                        break;
                }
            }
        } else {
            setButtons(unpublishButtons)
        }
    }, [status, isAdmin]);

    return (
        <EditPostButtons
            className={className}
            buttons={buttons}
            callback={callback}
        />
    );
};

export default EditButtons;