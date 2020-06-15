import { Component, OnInit, Inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { TasksListService } from "../../services/tasks-list.service";

@Component({
  selector: "app-tasks-list-dialog",
  templateUrl: "./tasks-list-dialog.component.html",
  styleUrls: ["./tasks-list-dialog.component.scss"]
})
export class TasksListDialogComponent implements OnInit {
  constructor(
    private tasksListService: TasksListService,
    public dialogRef: MatDialogRef<TasksListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  positions: Array<number> = [];
  form: FormGroup;

  /**
   * При инициализации создаем форму и получаем список доступных позиций
   */
  ngOnInit() {
    this.createForm();
    this.positions = this.getPositions(this.data.isNew);
  }

  /**
   * Создаем форму с валидацией
   */
  private createForm() {
    this.form = new FormGroup({
      name: new FormControl({ value: this.data.list.name }, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      position: new FormControl({ value: this.data.list.position }, [
        Validators.required,
        Validators.pattern(/^[1-9]\d*$/)
      ])
    });
  }

  /**
   * Получаем список доступных позиций
   * Если добавляем новый список задач, то увеличиваем количество на 1
   * @param {boolean} isNew
   * @returns {any[]}
   */
  private getPositions(isNew: boolean) {
    const maxPosition = this.tasksListService.getTasksListMaxPosition();
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

  /**
   * Закрываем диалог по нажатию на Cancel
   */
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
