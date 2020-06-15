import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {DragulaModule} from 'ng2-dragula';
import 'hammerjs';

import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule
} from "@angular/material";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

import { AppComponent } from "./app.component";
import { TasksListService } from "./services/tasks-list.service";

import { TasksListModule } from "./tasks-list/tasks-list.module";
import { TasksListDialogComponent } from "./tasks-list/tasks-list-dialog/tasks-list-dialog.component";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TasksListModule,
    PerfectScrollbarModule,
    DragulaModule
  ],
  entryComponents: [TasksListDialogComponent],
  providers: [
    TasksListService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
