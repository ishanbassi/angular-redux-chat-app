import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import {FormsModule } from '@angular/forms';
import {appStoreProviders} from './app.store';
import { ChatMessageComponent } from './chat-message/chat-message.component'
import { FromNowPipe } from './pipes/from-now.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatPageComponent,
    ChatNavBarComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    ChatThreadComponent,
    ChatMessageComponent,
    FromNowPipe
    
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    appStoreProviders    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
