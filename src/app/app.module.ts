import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppOutputComponent } from './app-output/app-output.component';
import { StageComponent } from './stage/stage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'
import {CentralService} from './central.service';
import { ArenaComponent } from './arena/arena.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MerchantDialog } from './merchant-dialog/merchant-dialog.component';
import { MenuDialog } from './menu-dialog/menu-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [
    AppComponent,
    AppOutputComponent,
    StageComponent,
    ArenaComponent,
    MerchantDialog,
    MenuDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [CentralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
