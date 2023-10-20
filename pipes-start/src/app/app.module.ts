import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {ShortenPipe} from "./shorten.pipe";
import { ServersFilterPipe } from './servers-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe,
    ServersFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
