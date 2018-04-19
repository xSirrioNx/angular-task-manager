import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';

import { MatExpansionModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  declarations: [TaskComponent],
  exports: [TaskComponent]
})
export class TaskModule { }
