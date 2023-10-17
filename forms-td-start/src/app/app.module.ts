import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TdChallengeComponent } from './td-challenge/td-challenge.component';

@NgModule({
  declarations: [
    AppComponent,
    TdChallengeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [TdChallengeComponent]
})
export class AppModule { }
