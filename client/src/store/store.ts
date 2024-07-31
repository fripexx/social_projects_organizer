import {combineReducers, configureStore} from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserSlice";
import ProjectReducer from "./reducers/ProjectSlice";
import ProjectMediaReducer from "./reducers/ProjectMediaSlice";
import UIReducer from "./reducers/UISlice";
import GeneralChatSlice from "./reducers/GeneralChatSlice";
import InstagramPublicationSlice from "./reducers/InstagramPublicationSlice";
import InstagramReelsSlice from "./reducers/InstagramReelsSlice";
import InstagramStoriesSlice from "./reducers/InstagramStoriesSlice";

const rootReducer = combineReducers({
    UserReducer,
    ProjectReducer,
    ProjectMediaReducer,
    UIReducer,
    GeneralChatSlice,
    InstagramPublicationSlice,
    InstagramReelsSlice,
    InstagramStoriesSlice
})


export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']