import dumpIcon from "../../../assets/images/dump_icon.svg";
import saveIcon from "../../../assets/images/save_icon.svg";
import downloadIcon from "../../../assets/images/download-icon.svg";
import clockIcon from "../../../assets/images/clock-icon.svg";
import {EditPostButton} from "../../../Components/EditPostComponents/EditPostButtons/EditPostButtons";

export const editButtons:EditPostButton[] = [
    {
        key: "delete",
        text: "Видалити пост",
        icon: dumpIcon,
        iconColor: "var(--Color-Red)"
    },
    {
        key: "save",
        text: "Зберегти та вийти",
        icon: saveIcon,
        iconColor: "var(--Color-Green)"
    },
    {
        key: "download",
        text: "Завантажити",
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