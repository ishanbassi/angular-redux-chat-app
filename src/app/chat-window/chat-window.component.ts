import { Component, ElementRef, Inject } from '@angular/core';
import { AppState } from '../app.reducer';
import { appStore } from '../app.store';
import { Thread } from '../thread/thread.model';
import { User } from '../user/user.model';
import { Store } from 'redux';
import { getCurrentThread } from '../thread/thread.reducer';
import { getCurrentUser } from '../user/users.reducer';
import { addMessage } from '../thread/thread.actions';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  currentThread:Thread;
  draftMessage:{text:string}
  currentUser:User

  constructor(
    @Inject(appStore) private store:Store<AppState>,
    private el:ElementRef
  ){
    this.store.subscribe(() => this.updateState())
    this.updateState()
    this.draftMessage = {text:""}
  }

  updateState() {
    const state = this.store.getState()

    this.currentThread = getCurrentThread(state) as Thread
    this.currentUser = getCurrentUser(state) as User
    this.scrollToBottom()
  }

  scrollToBottom(): void {
     const scrollPane: any = this.el
     .nativeElement.querySelector('.msg-container-base');
     if (scrollPane) {
       setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight);
     }
  }

  sendMessage() {
    this.store.dispatch(addMessage(this.currentThread, {
      author:this.currentUser,
      text:this.draftMessage.text,
      isRead:true
    }))
    this.draftMessage = {text:''}
  }

  onEnter(event:any) {
    event.preventDefault()
    this.sendMessage()
  }

}
