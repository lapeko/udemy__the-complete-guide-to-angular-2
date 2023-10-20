import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {ShortenPipe} from "./shorten.pipe";
import { ServersFilterPipe } from './servers-filter.pipe';
import { SortServersPipe } from './sort-servers.pipe';
import { ReversePipe } from './reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe,
    ServersFilterPipe,
    SortServersPipe,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
