import dumpIcon from "../../../assets/images/icons/dump-icon.svg";
import saveIcon from "../../../assets/images/icons/save-icon.svg";
import publishIcon from "../../../assets/images/icons/publish-icon.svg";
import downloadIcon from "../../../assets/images/download-icon.svg";
import clockIcon from "../../../assets/images/icons/clock-icon.svg";
import checkIcon from "../../../assets/images/icons/check-icon.svg";
import rejectIcon from "../../../assets/images/icons/reject-icon.svg";
import {EditPostButton} from "../../../Components/EditPostComponents/EditPostButtons/EditPostButtons";

/*
 * User buttons
 */

export const unpublishButtons:EditPostButton[] = [
    {
        key: "publish",
        text: "Опублікувати",
        icon: publishIcon,
        iconColor: "var(--Color-Green)"
    },
];

export const editButtons:EditPostButton[] = [
    {
        key: "delete",
        text: "Видалити пост",
        icon: dumpIcon,
        iconColor: "var(--Color-Red)"
    },
    {
        key: "save",
        text: "Зберегти",
        icon: saveIcon,
        iconColor: "var(--Color-Green)"
    },
    {
        key: "download",
        text: "Завантажити медіа",
        icon: downloadIcon,
        iconColor: "var(--Color-Blue)"
    },
    {
        key: "send-for-confirmation",
        text: "Відправити на підтвердження",
        icon: clockIcon,
        iconColor: "var(--Color-Yellow)"
    },
];

export const pendingButtons:EditPostButton[] = [
    {
        key: "delete",
        text: "Видалити пост",
        icon: dumpIcon,
        iconColor: "var(--Color-Red)"
    },
    {
        key: "save",
        text: "Зберегти",
        icon: saveIcon,
        iconColor: "var(--Color-Green)"
    },
    {
        key: "download",
        text: "Завантажити медіа",
        icon: downloadIcon,
        iconColor: "var(--Color-Blue)"
    },
];

export const rejectedButtons:EditPostButton[] = [
    {
        key: "delete",
        text: "Видалити пост",
        icon: dumpIcon,
        iconColor: "var(--Color-Red)"
    },
    {
        key: "save",
        text: "Зберегти",
        icon: saveIcon,
        iconColor: "var(--Color-Green)"
    },
    {
        key: "download",
        text: "Завантажити медіа",
        icon: downloadIcon,
        iconColor: "var(--Color-Blue)"
    },
    {
        key: "send-for-confirmation",
        text: "Відправити на підтвердження",
        icon: clockIcon,
        iconColor: "var(--Color-Yellow)"
    },
];

export const confirmButtons:EditPostButton[] = [
    {
        key: "delete",
        text: "Видалити пост",
        icon: dumpIcon,
        iconColor: "var(--Color-Red)"
    },
    {
        key: "download",
        text: "Завантажити медіа",
        icon: downloadIcon,
        iconColor: "var(--Color-Blue)"
    },
    {
        key: "save",
        text: "Зберегти",
        icon: saveIcon,
        iconColor: "var(--Color-Green)"
    },
];

/**
 * Customer buttons
 */

export const editCustomerButtons:EditPostButton[] = [
    {
        key: "download",
        text: "Завантажити медіа",
        icon: downloadIcon,
        iconColor: "var(--Color-Blue)"
    }
];

export const pendingCustomerButtons:EditPostButton[] = [
    {
        key: "download",
        text: "Завантажити медіа",
        icon: downloadIcon,
        iconColor: "var(--Color-Blue)"
    },
    {
        key: "reject",
        text: "Відхилити",
        icon: rejectIcon,
        iconColor: "var(--Color-Red)"
    },
    {
        key: "confirm",
        text: "Підтвердити",
        icon: checkIcon,
        iconColor: "var(--Color-Green)"
    },
];

export const rejectedCustomerButtons:EditPostButton[] = [
    {
        key: "download",
        text: "Завантажити медіа",
        icon: downloadIcon,
        iconColor: "var(--Color-Blue)"
    },
    {
        key: "confirm",
        text: "Підтвердити",
        icon: checkIcon,
        iconColor: "var(--Color-Green)"
    },
];

export const confirmCustomerButtons:EditPostButton[] = [
    {
        key: "download",
        text: "Завантажити медіа",
        icon: downloadIcon,
        iconColor: "var(--Color-Blue)"
    },
    {
        key: "reject",
        text: "Відхилити",
        icon: rejectIcon,
        iconColor: "var(--Color-Red)"
    },
];

