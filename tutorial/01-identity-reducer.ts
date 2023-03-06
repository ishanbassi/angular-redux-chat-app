export interface Action{
    type:string
    payload?:any
}
export interface Reducer<T>{
    (state:T,action:Action):T
}
interface ListenerCallback {
    ():void
}

let reducer:Reducer<number> = (state:number, action:Action) => {
    switch(action.type){
        case 'INCREMENT':
            return state+1
        case 'DECREMENT':
            return state-1
        case 'PLUS':
            return state + action.payload
        default:
            return state

    }
    
}
let plus7Action:Action = {
    type:"PLUS",
    payload:7
}
export class Store<T>{
    private _state:T
    private _listeners:ListenerCallback[] = []
    constructor(
        private reducer:Reducer<T>,
        initialState:T
    ){
        this._state = initialState
    }
    dispatch(action:Action) {
        this._state =  this.reducer(this._state,action)
        this._listeners.forEach(l => l())
    }
    getState() {
        return this._state
    }
    subscribe(listener:ListenerCallback) {
        this._listeners.push(listener)
        return () => {
            this._listeners = this._listeners.filter(l => l !== listener)
        }
    }
}
let store  = new Store<number>(reducer,0)
console.log(store.getState())

let unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch({type:'INCREMENT'})
store.dispatch({type:'INCREMENT'})

unsubscribe()
store.dispatch({type:'DECREMENT'})
