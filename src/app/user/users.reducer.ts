import { Reducer } from 'redux'
import { User } from "./user.model";
import * as userActions from './user.actions'
import { AppState } from '../app.reducer';
import { createSelector } from 'reselect';

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

export const getUserState = (state:AppState) => state.users
export const getCurrentUser  = createSelector(
    getUserState,
    user => user.currentUser
)