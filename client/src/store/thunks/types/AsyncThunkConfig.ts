import {ErrorResponseType} from "../../../api/types/ErrorResponseType";

export interface AsyncThunkConfig {
    rejectValue: ErrorResponseType;
}