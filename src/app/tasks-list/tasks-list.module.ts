import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TaskService } from "../services/task.service";
import { TasksListComponent } from "./tasks-list.component";

import { TaskModule } from "../task/task.module";
import {
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatSelectModule
} from "@angular/material";

import {DragulaModule} from 'ng2-dragula';

import { TasksListDialogComponent } from "./tasks-list-dialog/tasks-list-dialog.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    DragulaModule,
    MatSelectModule
  ],
  declarations: [
    TasksListComponent,
    TasksListDialogComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [ConfirmationDialogComponent],
  exports: [TasksListComponent],
  providers: [TaskService]
})
export class TasksListModule {}
