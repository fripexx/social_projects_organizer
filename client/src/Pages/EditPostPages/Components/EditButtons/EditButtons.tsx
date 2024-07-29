import React, {FC, useEffect, useState} from 'react';
import EditPostButtons, {EditPostButton} from "../../../../Components/EditPostComponents/EditPostButtons/EditPostButtons";
import {
    confirmCustomerButtons,
    confirmButtons,
    editCustomerButtons,
    editButtons,
    pendingCustomerButtons,
    pendingButtons,
    rejectedCustomerButtons,
    rejectedButtons,
    unpublishButtons
} from "../../constants/editButtons";
import {PostStatus} from "../../../../store/reducers/PostStatus";

interface EditButtonsProps {
    status: PostStatus | undefined;
    isAuthor: boolean;
    callback: (key: string) => void;
    className?: string;
}

const EditButtons: FC<EditButtonsProps> = ({status, isAuthor = false, callback, className}) => {
    const [buttons, setButtons] = useState<EditPostButton[]>(unpublishButtons)

    useEffect(() => {
        if(status) {
            if(isAuthor) {
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
            } else {
                switch (status) {
                    case "edit":
                        setButtons(editCustomerButtons)
                        break;
                    case "pending":
                        setButtons(pendingCustomerButtons)
                        break;
                    case "rejected":
                        setButtons(rejectedCustomerButtons)
                        break;
                    case "confirmed":
                        setButtons(confirmCustomerButtons)
                        break;
                }
            }
        } else {
            setButtons(unpublishButtons)
        }
    }, [status, isAuthor]);

    return (
        <EditPostButtons
            className={className}
            buttons={buttons}
            callback={callback}
        />
    );
};

export default EditButtons;