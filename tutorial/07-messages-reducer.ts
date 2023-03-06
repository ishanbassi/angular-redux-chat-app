
import {Action, Store,Reducer, legacy_createStore as createStore} from 'redux'


interface AppState{
    messages:string[]
}
interface ADD_MESSAGE_ACTION extends Action {
    messages:string
}
interface DELETE_MESSAGE_ACTION extends Action{
    index:number
}
let initialState:AppState = {messages:[]}
let reducer:Reducer<AppState>  = (state=initialState,action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                messages:state.messages.concat(
                    (<ADD_MESSAGE_ACTION>action).messages
                )
            }
        case 'DELETE_MESSAGE':
            let id = (<DELETE_MESSAGE_ACTION>action).index
            return {
                messages:[
                    ...state.messages.slice(0,id),
                    ...state.messages.slice(id+1,state.messages.length)
                ]
            }
        default:
            return {
                messages:[]
            }
    }
}
class MessageActions{
    static addMessage(message:string):ADD_MESSAGE_ACTION{
        return{
            type:'ADD_MESSAGE',
            messages:message
        }
    }
    static deleteMessage(idx:number):DELETE_MESSAGE_ACTION{
        return{
            type:"DELETE_MESSAGE",
            index:idx
        }
    }
}
let store:Store<AppState> = createStore(reducer)
store.dispatch(MessageActions.addMessage('Would you say the fringe was made of silk?'))
store.dispatch(MessageActions.addMessage('Wouldnt have no other kind but silk'))
store.dispatch(MessageActions.addMessage('Has it really got a team of snow white horses?'))

console.log(store.getState())