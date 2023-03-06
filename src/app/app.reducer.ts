import { combineReducers, Reducer } from "redux";
import { UsersState } from "./user/users.reducer";
import { ThreadsState } from "./thread/thread.reducer";
import { userReducer } from "./user/users.reducer";
import { threadReducer } from "./thread/thread.reducer";
export interface AppState{
    users:UsersState;
    threads:ThreadsState;
}

export const rootReducer:Reducer<AppState> = combineReducers({
    users:userReducer,
    threads:threadReducer
})