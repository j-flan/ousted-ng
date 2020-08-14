import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnemiesComponent } from './enemies/enemies.component';
import { BattleComponent } from './battle/battle.component';
import { AppOutputComponent } from './app-output/app-output.component';
import { StatsComponent } from './stats/stats.component';
import { StageComponent } from './stage/stage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'
import {CentralService} from './central.service'

@NgModule({
  declarations: [
    AppComponent,
    EnemiesComponent,
    BattleComponent,
    AppOutputComponent,
    StatsComponent,
    StageComponent
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
