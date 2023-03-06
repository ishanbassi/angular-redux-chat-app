import { InjectionToken } from "@angular/core";
import { legacy_createStore as createStore, StoreEnhancer, Store, compose } from "redux";
import { AppState, rootReducer } from "./app.reducer";
import {composeWithDevTools} from 'redux-devtools-extension'
export const appStore =  new InjectionToken('App.store')
const reduxTool = window['__REDUX_DEVTOOLS_EXTENSION__' as any] as any 
const devtools: StoreEnhancer<AppState> =
    reduxTool ?
    reduxTool() : f => f;


export const createAppStore = createStore(rootReducer,compose(reduxTool))

export const appStoreProviders = [
    {provide:appStore, useFactory:createAppStore}
]