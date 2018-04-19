import {Component, OnInit, Input} from '@angular/core';
import {TasksList} from '../services/tasks-list';
import {Task} from '../services/task';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() tasksList: TasksList;
  tasks: Task[];

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasksByListId(this.tasksList.id);
  }
}
