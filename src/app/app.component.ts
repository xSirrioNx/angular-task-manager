import {Component, OnInit} from '@angular/core';

import {TasksList} from './services/tasks-list';
import {TasksListService} from './services/tasks-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tasksLists: TasksList[];
  title = 'Task Manager';

  constructor(private tasksListService: TasksListService) {
  }

  ngOnInit() {
    this.getTasksLists();
  }

  getTasksLists(): void {
    this.tasksLists = this.tasksListService.getTasksLists();
  }
}
