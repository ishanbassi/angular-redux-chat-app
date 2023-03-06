import { Component, Inject } from '@angular/core';
import { AppState } from './app.reducer';
import { appStore } from './app.store';
import { ChatExampleData } from './data/chat-example-data';
import { Store } from 'redux';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    @Inject(appStore) private store:Store<AppState>
  ){
    ChatExampleData(store)
  }
}
