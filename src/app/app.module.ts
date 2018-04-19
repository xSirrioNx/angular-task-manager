import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';

import { AppComponent } from './app.component';
import { TasksListService } from './services/tasks-list.service';

import {TasksListModule} from './tasks-list/tasks-list.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    // MatCardModule,
    MatButtonModule,
    TasksListModule
    // MatExpansionModule
  ],
  providers: [TasksListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
