import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TaskService} from '../services/task.service';
import { TasksListComponent } from './tasks-list.component';

import {TaskModule} from '../task/task.module';
import {MatCardModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TaskModule,
    MatCardModule,
    MatExpansionModule
  ],
  declarations: [TasksListComponent],
  exports: [TasksListComponent],
  providers: [TaskService]
})
export class TasksListModule { }
