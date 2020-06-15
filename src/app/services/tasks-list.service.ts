import { Injectable } from "@angular/core";
import { TasksList } from "./tasks-list";
import { Task } from "./task";

@Injectable()
export class TasksListService {
  constructor() {}
  tasksListsExample: TasksList[] = [
    { id: 11, name: "Sprint 1", position: 1 },
    { id: 12, name: "Sprint 2", position: 2 },
    { id: 13, name: "Sprint 3", position: 3 },
    { id: 14, name: "Sprint 4", position: 4 },
    { id: 15, name: "Sprint 5", position: 5 }
  ];
  tasksLists: TasksList[];

  /**
   * Если в LocalStorage есть объект tasksLists, то берем данные из него
   * Иначе ипользуем предзаданные списки
   */
  getData(): void {
    const lsTasksLists = JSON.parse(localStorage.getItem("tasksLists"));
    if (lsTasksLists) {
      for (let t of lsTasksLists) {
        t = new TasksList(t);
      }
      this.tasksLists = lsTasksLists;
    } else {
      this.tasksLists = this.tasksListsExample.map(x => Object.assign({}, x));
    }
  }
  /**
   * Сбрасываем списки на предзаданные
   */
  clearState(): void {
    this.tasksLists = [];
    this.tasksLists = this.tasksListsExample.map(x => Object.assign({}, x));
  }
  /**
   * Получение массива всех списков задач
   * @returns {TasksList[]}
   */
  getTasksLists(): TasksList[] {
    return this.tasksLists;
  }

  /**
   * Сортируем списки по их позициям (по возрастанию)
   * @returns {TasksList[]}
   */
  orderByPosition(): TasksList[] {
    const clone = this.tasksLists.map(x => Object.assign({}, x));
    clone.sort((a: any, b: any) => {
      if (a.position < b.position) {
        return -1;
      } else if (a.position > b.position) {
        return 1;
      } else {
        return 0;
      }
    });
    console.warn("clone", clone)
    this.tasksLists = [];
    this.tasksLists = clone;
    return this.tasksLists;
  }

  /**
   * Получаем максимальную возможную позицию списка
   * @returns {number}
   */
  getTasksListMaxPosition(): number {
    let max = Math.max.apply(
      Math,
      this.tasksLists.map(tasksList => {
        return tasksList.position;
      })
    );
    if (max < 0) {
      max = 0;
    }
    return max;
  }

  /**
   * Возвращает список по идентификатору
   * @param {number} id
   * @returns {TasksList}
   */
  getTasksListById(id: number): TasksList {
    return this.tasksLists.find(l => l.id === id);
  }

  /**
   * Пересчет позиции каждого списка
   * @param {TasksList} tasksList
   * @param {number} prevPosition
   * @returns {TasksList[]}
   */
  recalculatePositions(
    tasksList?: TasksList,
    prevPosition?: number
  ): TasksList[] {
    if (tasksList) {
      const clone = this.tasksLists.map(x => Object.assign({}, x));
      if (prevPosition > tasksList.position) {
        clone.forEach((t: TasksList, index: number) => {
          if (
            t.id !== tasksList.id &&
            t.position >= tasksList.position &&
            t.position < prevPosition
          ) {
            this.tasksLists[index].position = t.position + 1;
          }
        });
      } else {
        clone.forEach((t: TasksList, index: number) => {
          if (
            t.id !== tasksList.id &&
            t.position <= tasksList.position &&
            t.position > prevPosition
          ) {
            this.tasksLists[index].position = t.position - 1;
          }
        });
      }
    } else {
      this.tasksLists.forEach((t: Task, index: number) => {
        this.tasksLists[index].position = index + 1;
      });
    }
    this.orderByPosition();
    return this.tasksLists;
  }

  /**
   * Получение следующего ID для списка при добавлении
   * @returns {number}
   */
  getNextId(): number {
    return (
      Math.max.apply(
        Math,
        this.tasksLists.map(list => {
          return list.id;
        })
      ) + 1
    );
  }

  /**
   * Добавление списка здача
   * @param {TasksList} list
   * @returns {number}
   */
  addList(list: TasksList): number {
    list.id = this.getNextId();
    this.tasksLists.push(list);
    console.log(this.tasksLists);
    this.recalculatePositions(list, Infinity);
    return list.id;
  }

  /**
   * Обновление списка задач
   * @param {TasksList} list
   */
  updateList(list: TasksList) {
    const oldList = this.getTasksListById(list.id);
    const index = this.tasksLists.indexOf(oldList);
    this.tasksLists[index] = list;
  }

  /**
   * Удаление списка задач
   * @param {TasksList} list
   */
  removeList(list: TasksList): void {
    const index = this.tasksLists.indexOf(list);
    this.tasksLists.splice(index, 1);
    this.recalculatePositions(list, Infinity);
  }

  /**
   * Сохранение списков в LocalStorage
   */
  saveData(): void {
    localStorage.setItem("tasksLists", JSON.stringify(this.tasksLists));
  }
}
