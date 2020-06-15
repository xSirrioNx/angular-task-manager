import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskComponent } from "./task.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatCardModule,
  MatChipsModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatDialogModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSlideToggleModule
} from "@angular/material";
import { TaskDialogComponent } from "./task-dialog/task-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  declarations: [TaskComponent, TaskDialogComponent],
  exports: [TaskComponent],
  entryComponents: [TaskDialogComponent]
})
export class TaskModule {}
