import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterControlsComponent } from './counter-controls/counter-controls.component';
import { counterReducer } from "./store/counter.reducer";
import * as counterEffects from "./store/counter.effects";

@NgModule({
  declarations: [
    AppComponent,
    CounterOutputComponent,
    CounterControlsComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({counter: counterReducer}, {}),
    EffectsModule.forRoot(counterEffects),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
