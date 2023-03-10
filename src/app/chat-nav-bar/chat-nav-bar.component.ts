import { Component } from '@angular/core';
import { Store } from 'redux';
import {appStore } from '../app.store'
import { Inject } from '@angular/core';
import { AppState } from '../app.reducer';
import { getUnreadMessagesCount } from '../thread/thread.reducer';
@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css']
})
export class ChatNavBarComponent {
  unreadMessagesCount:number
  constructor(
    @Inject(appStore) private store:Store<AppState>

  ) {
    store.subscribe(() => this.updateState())
    this.updateState()
  }
  updateState() {
    this.unreadMessagesCount = getUnreadMessagesCount(this.store.getState())
  }
}
