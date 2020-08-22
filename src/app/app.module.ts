import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppOutputComponent } from './app-output/app-output.component';
import { StageComponent } from './stage/stage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'
import {CentralService} from './central.service';
import { ArenaComponent } from './arena/arena.component'

@NgModule({
  declarations: [
    AppComponent,
    AppOutputComponent,
    StageComponent,
    ArenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [CentralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
