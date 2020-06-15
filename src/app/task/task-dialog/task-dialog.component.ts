import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { TasksList } from "../../services/tasks-list";
import { TasksListService } from "../../services/tasks-list.service";
import { TaskService } from "../../services/task.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-task-dialog",
  templateUrl: "./task-dialog.component.html",
  styleUrls: ["./task-dialog.component.scss"]
})
export class TaskDialogComponent implements OnInit {
  constructor(
    private tasksListService: TasksListService,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  form: FormGroup;
  tasksLists: TasksList[];
  positions: Array<number> = [];
  originalTasksListId: number;
  ngOnInit() {
    this.positions = this.getPositions(this.data.task.listId, false);
    this.createForm();
    /**
     * Получаем массив списков задач для подстановки в селект
     * @type {TasksList[]}
     */
    this.tasksLists = this.tasksListService.getTasksLists();
    if (this.data.task.id) {
      /**
       * Если у задачи есть id (не новая), то запоминаем изначальный идентификатор списка задач
       * @type {number | number}
       */
      this.originalTasksListId = this.data.task.listId;
    }
  }

  /**
   * Создаем форму для редактирования задачи с валидаторами
   */
  private createForm() {
    this.form = new FormGroup({
      name: new FormControl(
        { value: this.data.task.name, disabled: this.data.viewOnly },
        [Validators.required, Validators.minLength(3), Validators.maxLength(15)]
      ),
      description: new FormControl(
        { value: this.data.task.description, disabled: this.data.viewOnly },
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(255)
        ]
      ),
      date: new FormControl(
        { value: this.data.task.date, disabled: this.data.viewOnly },
        [Validators.required]
      ),
      tasksList: new FormControl(
        { value: this.data.task.listId, disabled: this.data.viewOnly },
        [Validators.required, Validators.pattern(/^[1-9]\d*$/)]
      ),
      position: new FormControl(
        { value: this.data.task.position, disabled: this.data.viewOnly },
        [Validators.required, Validators.pattern(/^[1-9]\d*$/)]
      ),
      isReady: new FormControl(
        { value: this.data.task.isReady, disabled: this.data.viewOnly }
      ),
    });
  }

  /**
   * Проверяем поле формы на налицие ошибок и формируем строку с ошибками
   * для отображения пользователю
   * @param errors
   * @returns {string}
   */
  getErrors(errors: any): string {
    let errorString = "";
    if (errors.required) {
      errorString += "Required! ";
    }

    if (errors.minlength) {
      errorString +=
        "Min length: " +
        errors.minlength.requiredLength +
        " current: " +
        errors.minlength.actualLength +
        " ";
    }
    if (errors.maxlength) {
      errorString +=
        "Max length: " +
        errors.maxlength.requiredLength +
        " current: " +
        errors.maxlength.actualLength +
        " ";
    }
    if (errors.matDatepickerParse) {
      errorString += "Wrong date format! ";
    }
    if (errors.pattern) {
      errorString += "Required! ";
    }
    return errorString;
  }
  /**
   * Срабатывает при изменении атрибута listId (селект)
   * Получаем список возможных позиций задачи в выбранном списке
   * @param {number} listId
   */
  onTasksListChange(listId: number): void {
    let isNewInList = false;

    if (!this.originalTasksListId || this.originalTasksListId !== listId) {
      isNewInList = true;
      this.data.task.position = null;
    }
    this.positions = [];
    this.positions = this.getPositions(listId, isNewInList);
  }

  /**
   * Получаем от сервиса максимальное значение позиции.
   * Если элемент добавляется в список, то к максимальному значению прибавляем 1.
   * @param {number} id - идентификатор спика (listId)
   * @param {boolean} isNew флаг, отображающий является задача новой в этом списке
   * @returns {any[]} массив формата [1, 2, ..., n]
   */
  private getPositions(id: number, isNew: boolean) {
    const maxPosition = this.taskService.getTasksMaxPosition(id);
    let addition = 0;
    const positions = [];
    if (isNew) {
      addition = 1;
    }
    for (let i = 1; i <= maxPosition + addition; i++) {
      positions.push(i);
    }
    return positions;
  }

  /**
   * Закрываем диалог по нажатию кнопки Cancel
   */
  onCancelClick(): void {
    this.dialogRef.close();
  }

  /**
   * Из режима просмотра можно перейти в режим редактирования
   * путем нажатия соответствующей кнопки
   */
  switchToEditMode(): void {
    this.data.viewOnly = false;
    this.form.get("name").enable();
    this.form.get("description").enable();
    this.form.get("date").enable();
    this.form.get("tasksList").enable();
    this.form.get("position").enable();
    this.form.get("isReady").enable();
  }

  /**
   * Нажатие кнопки Ок разрешено только если форма полностью валидна
   * @returns {boolean}
   */
  isFormValid(): boolean {
    let isValid = true;
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        isValid = false;
      }
    });
    return isValid;
  }
}
