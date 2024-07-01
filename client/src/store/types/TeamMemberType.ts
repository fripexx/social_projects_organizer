import {BasicUserInfo} from "./UserType";
import {RoleType} from "./RoleType";

export interface TeamMemberType {
    user: BasicUserInfo,
    role: RoleType
}