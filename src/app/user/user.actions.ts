import { Action, ActionCreator } from "redux";
import { User } from "./user.model";

export const SET_CURRENT_USER = '[User] Set Current'
export interface SetCurrentUserAction extends Action {
    user:User
}

export const setCurrentUser:ActionCreator<SetCurrentUserAction> = (user) => {
    return{
        type:SET_CURRENT_USER,
        user
    }
}