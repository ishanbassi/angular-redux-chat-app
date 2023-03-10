import { Reducer } from "redux";
import { Thread } from "./thread.model";
import * as ThreadAction from './thread.actions'
import {createSelector} from 'reselect'
import { AppState } from "../app.reducer";
interface ThreadEntities{
    [id:string]:Thread
}

export interface ThreadsState{
    ids:string[];
    entities:ThreadEntities,
    currentThreadId?:string | null
}

const initialState:ThreadsState = {
    ids:[],
    currentThreadId:null,
    entities:{},


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

export const getThreadsState     = (state:AppState):ThreadsState => state.threads
export const getThreadEntities = createSelector(
    getThreadsState,
    (thread:ThreadsState) => thread.entities
    )

export const getCurrentThread = createSelector(
    getThreadsState,
    getThreadEntities,
    (state,entities)  => state.currentThreadId ?  entities[state.currentThreadId] : null
)
export const getAllThreads = createSelector(
    getThreadEntities,
    (entities) => Object.keys(entities).map(id => entities[id])
)

export const getUnreadMessagesCount = createSelector(
    getAllThreads,
    threads => threads.reduce((count:number, thread:Thread) => {
        thread.messages.forEach(message => {
            if(!message.isRead)  ++count
        })
        return ++count
    }, 0)
)


export const getAllMessages = createSelector(
    getAllThreads,
    ( threads ) =>
      threads.reduce( // gather all messages
        (messages:any[], thread) => [...messages, ...thread.messages],
        []).sort((m1, m2) => m1.sentAt - m2.sentAt)); // sort them by time
  