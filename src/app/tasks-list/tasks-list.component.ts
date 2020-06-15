import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from "@angular/core";
import { TasksList } from "../services/tasks-list";
import { Task } from "../services/task";
import { TaskService } from "../services/task.service";
import { TasksListService } from "../services/tasks-list.service";
import { TasksListDialogComponent } from "./tasks-list-dialog/tasks-list-dialog.component";
import { TaskDialogComponent } from "../task/task-dialog/task-dialog.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"]
})
export class TasksListComponent implements OnInit {
  @Input() tasksList: TasksList;
  @ViewChild("cardContent") cardContentElement: ElementRef;
  @Output() listChange: EventEmitter<TasksList> = new EventEmitter<TasksList>();
  tasks: Task[];
  constructor(
    private taskService: TaskService,
    private tasksListService: TasksListService,
    public dialog: MatDialog,
    private dragulaService: DragulaService
  ) {
    taskService.taskListChanged$.subscribe(task => {
      this.onTaskListChanged(task);
    });

    dragulaService.dropModel.subscribe((args: any) => {
      const [name, task, newList, oldList] = args;
      if (this.cardContentElement.nativeElement === newList) {
        if (oldList === newList) {
          this.tasks = this.taskService.recalculatePositions(this.tasks);
        } else {
          this.onDragAddTask(task);
        }
        return;
      }

      if (this.cardContentElement.nativeElement === oldList) {
        this.tasks = this.taskService.recalculatePositions(this.tasks);
      }
    });
  }

  /**
   * При инициализации получаем списки задач
   */
  ngOnInit() {
    this.getTasks();
  }

  /**
   * Получаем массив задач для списка
   */
  getTasks(): void {
    this.tasks = this.taskService.getTasksByListId(this.tasksList.id);
  }

  /**
   * После перетаскивания списка, обновляем позиции всех списков
   * @param task
   */
  onDragAddTask(task): void {
    const newTask = this.tasks.find(t => t.listId !== this.tasksList.id);
    newTask.position = this.tasks.indexOf(newTask) + 1;
    newTask.listId = this.tasksList.id;
    this.taskService.updateTask(newTask);
    let shadowTasks = Object.assign([], this.tasks);
    shadowTasks = this.taskService.orderByPosition(shadowTasks);
    this.taskService.recalculatePositions(
      shadowTasks,
      newTask,
      Infinity
    );
  }

  /**
   * По нажатию на кнопку, открываем диалог редактирования спика задач
   */
  openEditDialog(): void {
    const dialogRef = this.dialog.open(TasksListDialogComponent, {
      width: "300px",
      data: {
        list: new TasksList(this.tasksList),
        isNew: false,
        title:
          "Edit tasks list " +
          this.tasksList.name +
          "(" +
          this.tasksList.id +
          ")"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /**
         * Обновляем список задач и сообщаем родителю об изменении
         * @type {TasksList}
         */
        this.tasksList = new TasksList(result);
        this.listChange.emit(this.tasksList);
      }
    });
  }

  /**
   * При нажатии на кнопку удаления диалога, открываем диалог подтверждения удаления
   */
  openRemoveDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "300px",
      data: {
        title:
          "Remove list " + this.tasksList.name + "(" + this.tasksList.id + ")?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /**
         * При нажатии на ОК, удаляем все вложенные задачи, после чего удаляем сам список задач
         */
        this.tasks.forEach(task => {
          this.onRemoveTask(task);
        });
        this.tasksListService.removeList(this.tasksList);
      }
    });
  }

  /**
   * По нажатию на кноаку добавления задачи, открываем диалог добавления задачи
   */
  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "400px",
      data: {
        viewOnly: false,
        task: new Task({
          listId: this.tasksList.id
        }),
        title: "New task"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /**
         * При нажатии на ОК, добавляем задачу в серви и в текущий список
         */
        this.onAddTask(result);
      }
    });
  }

  /**
   * При добавлении новой задачи, необходимо пересчитать позиции для кадой задачи из списка
   * @param {Task} task
   */
  onAddTask(task: Task) {
    task.id = this.taskService.addTask(task);
    let shadowTasks = Object.assign([], this.tasks);
    shadowTasks.push(task);
    shadowTasks = this.taskService.recalculatePositions(
      shadowTasks,
      task,
      Infinity
    );
    this.tasks = [];
    this.tasks = shadowTasks;
  }

  /**
   * Срабатывает после подтверждения редактирования задачи (из диалога)
   * Сразу обновляем задачу в сервисе
   * Если изменился родительский список, то ничего не делаем
   * Иначе обновляем задачу и пересчитываем позиции задач в списке
   * @param {Task} newTask
   */
  onTaskChange(newTask: Task): void {
    this.taskService.updateTask(newTask);
    if (this.tasksList.id !== newTask.listId) {
      return;
    }

    let shadowTasks = Object.assign([], this.tasks);

    const oldTask = shadowTasks.find(t => {
      return t.id === newTask.id;
    });

    const oldTaskIndex = shadowTasks.indexOf(oldTask);
    shadowTasks.splice(oldTaskIndex, 1);
    shadowTasks.push(newTask);
    shadowTasks = this.taskService.recalculatePositions(
      shadowTasks,
      newTask,
      oldTask.position
    );
    this.tasks = [];
    this.tasks = shadowTasks;
  }

  /**
   * Событие слушается всеми списками задач
   * Когда у задачи изменился listId, все списки задач проверяют
   * нужно ли добавить или удалить эту задачу
   * @param {Task} task
   */
  onTaskListChanged(task: Task): void {
    let shadowTasks = Object.assign([], this.tasks);
    const oldTask = this.tasks.find(t => {
      return t.id === task.id;
    });
    const index = this.tasks.indexOf(oldTask);
    if (index > -1) {
      shadowTasks.splice(index, 1);
      shadowTasks = this.taskService.recalculatePositions(shadowTasks);
      this.tasks = [];
      this.tasks = shadowTasks;
      return;
    }
    if (this.tasksList.id === task.listId) {
      shadowTasks.push(task);
      shadowTasks = this.taskService.recalculatePositions(
        shadowTasks,
        task,
        Infinity
      );
      this.tasks = [];
      this.tasks = shadowTasks;
    }
  }

  /**
   * Вызывается по событию от дочернего элемента
   * Удаляет выбранный элемент из сервиса и из списка
   * Пересчитываем позиции элементов
   * @param {Task} task
   */
  onRemoveTask(task: Task): void {
    this.taskService.removeTask(task);
    let shadowTasks = Object.assign([], this.tasks);
    const index = this.tasks.indexOf(task);
    shadowTasks.splice(index, 1);
    shadowTasks = this.taskService.recalculatePositions(shadowTasks);
    this.tasks = [];
    this.tasks = shadowTasks;
  }
}
