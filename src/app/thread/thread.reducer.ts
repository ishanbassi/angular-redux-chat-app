import { Reducer } from "redux";
import { Thread } from "./thread.model";
import * as ThreadAction from './thread.actions'
interface ThreadEntities{
    [id:string]:Thread
}

export interface ThreadsState{
    ids:string[];
    entities:ThreadEntities,
    currentThreadId?:string  | null
}

const initialState:ThreadsState = {
    ids:[],
    entities:{},
    currentThreadId:null

}

export const threadReducer:Reducer<ThreadsState> = (state=initialState, action) => {
    switch(action.type){
        case ThreadAction.ADD_THREAD:{
                const thread = (<ThreadAction.AddThreadAction>action).thread
                if(state.ids.includes(thread.id)){
                    return state
                }
                return {
                
                    ids:[...state.ids, thread.id],
                    entities:Object.assign({}, state.entities , {[thread.id]:thread}),
                    currentThreadId:state.currentThreadId
                }
        }
        case ThreadAction.ADD_MESSAGE:{
            const {thread, message} = (<ThreadAction.AddMessageAction>action)

            const isRead = message.thread?.id == state.currentThreadId ? true : message.isRead
            const newMessage  = Object.assign({}, message, {isRead})
            
            const oldThread = state.entities[thread.id]
            const newThread:Thread = Object.assign({}, oldThread, {messages:oldThread.messages.concat(newMessage)})

            
            const entities = Object.assign({}, state.entities, {[thread.id]:newThread})
            return {
                ids:state.ids,
                currentThreadId:state.currentThreadId,
                entities
                
            }
        }
        case ThreadAction.SELECT_THREAD: {
            const thread  = (<ThreadAction.SelectThreadAction>action).thread
            const oldThread = state.entities[thread.id]

            const newMessages = oldThread.messages.map(message => Object.assign({}, message, {isRead:true}))

            const newThread = {...oldThread, ...{messages:newMessages}} //using object deconstructing instead of object.assign

            return {
                currentThreadId:newThread.id,
                entities:{...state.entities, ...{[newThread.id]:newThread}},
                ids:state.ids
            }
        }
            
        default:
            return state
    }
}