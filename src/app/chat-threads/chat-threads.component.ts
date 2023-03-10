import { Component, Inject } from '@angular/core'
import { Store } from 'redux'
import { AppState } from '../app.reducer'
import { appStore } from '../app.store'
import { Thread } from '../thread/thread.model'
import { getAllThreads, getCurrentThread } from '../thread/thread.reducer'
import { selectThread } from '../thread/thread.actions'


@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent {
  threads:Thread[]
  currentThreadId:string

  constructor(
    @Inject(appStore) private store:Store<AppState>
  ) {
    store.subscribe(() => this.updateState())
    this.updateState()
  }

  updateState() {
    const state = this.store.getState()

    this.threads  = getAllThreads(state)

    this.currentThreadId = getCurrentThread(state)?.id as string
  }

  handleThreadClicked(thread:Thread) {
    this.store.dispatch(selectThread(thread) )
  }
}
