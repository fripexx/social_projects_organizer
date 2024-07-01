import {RoleType} from "../store/types/RoleType";

interface RolesListType {
    value: RoleType;
    label: string;
}

export const rolesList:RolesListType[] = [
    {
        value: "smm_manager",
        label: "SMM менеджер"
    },
    {
        value: "customer",
        label: "Замовник"
    },
    {
        value: "target_manager",
        label: "Таргетолог"
    },
    {
        value: "designer",
        label: "Дизайнер"
    },
]