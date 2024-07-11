import dumpIcon from "../../../assets/images/dump_icon.svg";
import saveIcon from "../../../assets/images/save_icon.svg";
import downloadIcon from "../../../assets/images/download-icon.svg";
import clockIcon from "../../../assets/images/clock-icon.svg";
import checkIcon from "../../../assets/images/check-icon.svg";
import rejectIcon from "../../../assets/images/reject-icon.svg";
import {EditPostButton} from "../../../Components/EditPostComponents/EditPostButtons/EditPostButtons";

/*
 * User buttons
 */

export const unpublishButtons:EditPostButton[] = [
    {
        key: "save",
        text: "Зберегти",
        icon: saveIcon,
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
];

/**
 * Admin buttons
 */

export const editAdminButtons:EditPostButton[] = [
    {
        key: "download",
        text: "Завантажити медіа",
        icon: downloadIcon,
        iconColor: "var(--Color-Blue)"
    }
];

export const pendingAdminButtons:EditPostButton[] = [
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

export const rejectedAdminButtons:EditPostButton[] = [
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

export const confirmAdminButtons:EditPostButton[] = [
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

