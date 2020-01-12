import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ImageService } from 'src/Service/imageService';
import { FormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: 'http://localhost:1923', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
