import { Action, ActionCreator } from 'redux'
import { Message } from "../Message/message.model";
import { Thread } from "./thread.model";
import { uuid } from '../util/uuid';
export const ADD_THREAD =  '[THREAD] ADD'
export interface AddThreadAction extends Action{
    thread:Thread
}

export const addThread:ActionCreator<AddThreadAction> = (thread) => {
    return {
        thread,
        type:ADD_THREAD
    }
}

export const ADD_MESSAGE =  '[THREAD] ADD MESSAGE'
export interface AddMessageAction extends Action{
    thread:Thread;
    message:Message;
}

export const addMessage:ActionCreator<AddMessageAction> = (thread:Thread,messageArgs:Message) => {


    const defaults = {
        id:uuid(),
        sentAt:new Date(),
        isRead:false,
        thread

    }
    const message:Message = Object.assign({}, defaults, messageArgs)
    return{
        type:ADD_MESSAGE,
        thread:thread,
        message
    }
}

export const SELECT_THREAD = '[Thread] Select';
 export interface SelectThreadAction extends Action {
 thread: Thread;
 }
 export const selectThread: ActionCreator<SelectThreadAction> =
 (thread) => ({
 type: SELECT_THREAD,
 thread: thread
 });