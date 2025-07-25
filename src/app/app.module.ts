import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HostComponent } from './host/host.component';
import { PlayerComponent } from './player/player.component';

// Keep in sync with "server.js"
const config: SocketIoConfig = { url: '192.168.86.30:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
