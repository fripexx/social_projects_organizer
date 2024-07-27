import {BasicUserInfo} from "./UserType";
import {RoleType} from "./RoleType";

export interface BasicTeamMemberType {
    user: string,
    role: RoleType
}

export interface TeamMemberType {
    user: BasicUserInfo,
    role: RoleType
}