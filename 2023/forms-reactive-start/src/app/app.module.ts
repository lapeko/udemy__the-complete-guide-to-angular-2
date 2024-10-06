import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ReactiveFormChallengeComponent } from './reactive-form-challenge/reactive-form-challenge.component';

@NgModule({
  declarations: [
    ReactiveFormChallengeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [ReactiveFormChallengeComponent]
})
export class AppModule { }
