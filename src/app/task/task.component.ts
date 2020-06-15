import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Task } from "../services/task";
import { MatDialog } from "@angular/material";
import { TaskDialogComponent } from "./task-dialog/task-dialog.component";

import { TaskService } from "../services/task.service";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Output() taskChange: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() removeTask = new EventEmitter<Task>();
  limit: number = 3 * 24 * 60 * 60 * 1000;

  constructor(public dialog: MatDialog, private taskService: TaskService) {}

  ngOnInit() {}

  /**
   * Если у задачи дата меньше текущей, то устанавливаем на элемент Chips класс danger
   * Если дата меньше предела (3 дня), то устанавливаем класс warning
   * Если задача помечена как готовая, то устанавливаем класс ready
   * @returns {string}
   */
  getClassByDate() {
    let className = "";
    const taskDate = this.task.date.getTime();
    const difference = taskDate - Date.now();
    if (difference < this.limit) {
      className = "warning";
    }
    if (difference < 0) {
      className = "danger";
    }
    if (this.task.isReady) {
      className = "ready";
    }
    return className;
  }

  /**
   * Открываем диалог просмотра/редактирования задачи
   * @param {boolean} viewOnly - флаг, указывающий режим просмотра или редактирования в диалоге
   */
  openTaskDialog(viewOnly: boolean): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "400px",
      data: {
        viewOnly: viewOnly,
        task: new Task(this.task),
        title: this.task.name + "(" + this.task.id + ")"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /**
         * При подтверждении редактирования
         * Если изменился родительский список, то через сервис
         * оповещаем все списки задач
         * Если нет, то просто применяем измениня и оповещаем об этом родителя
         * для пересчета позиций
         */
        if (this.task.listId !== result.listId) {
          this.taskService.changeTaskList(result);
        }
        this.task = result;
        this.taskChange.emit(this.task);
      }
    });
  }

  /**
   * Открываем диалог удаления задачи
   */
  openRemoveDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "300px",
      data: {
        title: "Remove task " + this.task.name + "(" + this.task.id + ")?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /**
         * После подтверждения удаления, оповещаем родителя о том,
         * что надо удалить данную задачу
         */
        this.removeTask.emit(this.task);
      }
    });
  }
}
