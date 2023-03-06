import { Reducer } from "redux";
import { User } from "./user.model";
import * as userActions from './user.actions'

export interface UsersState{
    currentUser:User | null
}

const initialState:UsersState = {
    currentUser:null
}

export const userReducer:Reducer<UsersState> = (state = initialState, action) => {
    switch(action.type){
        case userActions.SET_CURRENT_USER:
            const user = (<userActions.SetCurrentUserAction>action).user
            return {
                currentUser:user
            }
        default:
            return state
    }
}