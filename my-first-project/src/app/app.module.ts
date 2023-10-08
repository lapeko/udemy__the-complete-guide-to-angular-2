import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServerComponent } from "./server/server.component";
import { FormsModule } from "@angular/forms";
import { ServerFormComponent } from './server-form/server-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServerFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
