import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';



@NgModule({
  declarations: [
    AppComponent,
    ChatPageComponent,
    ChatNavBarComponent,
    ChatThreadsComponent,
    ChatWindowComponent,
    
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
