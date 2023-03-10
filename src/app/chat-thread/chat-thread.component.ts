import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Thread } from '../thread/thread.model';
@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent {
  @Input() thread:Thread
  @Output() onThreadSelected:EventEmitter<Thread>
  @Input() selected:boolean
  constructor() {
    this.onThreadSelected = new EventEmitter()
  }

  clicked(event:any) {
    event.preventDefault()
    this.onThreadSelected.emit(this.thread)
  }
}
