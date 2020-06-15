import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {TasksList} from './services/tasks-list';
import {TasksListService} from './services/tasks-list.service';
import {TaskService} from './services/task.service';

import {TasksListDialogComponent} from './tasks-list/tasks-list-dialog/tasks-list-dialog.component';

import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tasksLists: TasksList[];
  title = 'Task Manager';
  dragulaOptions: any = {
    moves: function (el, container, handle) {
      return handle.classList.contains('tasks-list-dnd-handler');
    }
  };

  /**
   * Перед закрытием/обновлением вкладки сохраняем
   * списки задач и задачи в LocalStorage
   */
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler() {
    this.tasksListService.saveData();
    this.taskService.saveData();
  }

  constructor(
    private tasksListService: TasksListService,
    private taskService: TaskService,
    public dialog: MatDialog,
    private dragulaService: DragulaService
  ) {
    this.taskService.getData();
    this.tasksListService.getData();
    dragulaService.dropModel.subscribe((args: any) => {
      this.tasksListService.recalculatePositions();
    });
  }

  /**
   * При инициализации получаем списки задач
   */
  ngOnInit() {
    this.getTasksLists();
  }

  /**
   * Получаем от сервиса массив списков задач
   */
  getTasksLists(): void {
    this.tasksLists = this.tasksListService.getTasksLists();
  }

  /**
   * При нажатии на кнопку Clear State, возвращаем списки задач
   * и задачи к предзаданным значениям
   */
  clearState(): void {
    this.taskService.clearState();
    this.tasksListService.clearState();
    this.getTasksLists();
  }

  /**
   * При изменении списка задач, обновляем его и пересчитываем позиции
   * @param {TasksList} list
   */
  onListChange(list: TasksList): void {
    const oldList = this.tasksLists.find(l => l.id === list.id);
    const prevPosition = oldList.position;
    this.tasksListService.updateList(list);
    this.tasksLists = [];
    this.tasksLists = this.tasksListService.recalculatePositions(list, prevPosition);
  }

  /**
   * По нажатию на кнопку, открываем диалог добавления списка задач
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(TasksListDialogComponent, {
      width: '300px',
      data: {
        list: new TasksList({}),
        isNew: true,
        title: 'Create new Tasks list'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      /**
       * Если была нажата кнопка Ок, то добавляем список задач
       */
      if (result) {
        this.tasksListService.addList(result);
        this.tasksLists = this.tasksListService.getTasksLists();
      }
    });
  }
}
