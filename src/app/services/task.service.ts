import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

import { Task } from "./task";

@Injectable()
export class TaskService {
  private taskListChangedSource = new Subject<Task>();
  taskListChanged$ = this.taskListChangedSource.asObservable();

  tasksExample: Task[] = [
    {
      id: 1,
      name: "Task 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        " eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: new Date("05/12/18"),
      listId: 11,
      position: 1,
      isReady: false
    },
    {
      id: 2,
      name: "Task 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        " eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: new Date("4/11/18"),
      listId: 11,
      position: 2,
      isReady: true
    },
    {
      id: 3,
      name: "Task 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        " eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: new Date("4/1/18"),
      listId: 12,
      position: 1,
      isReady: false
    },
    {
      id: 4,
      name: "Task 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        " eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: new Date("10/2/18"),
      listId: 12,
      position: 2,
      isReady: false
    },
    {
      id: 5,
      name: "Task 5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        " eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: new Date("3/24/18"),
      listId: 13,
      position: 1,
      isReady: true
    },
    {
      id: 6,
      name: "Task 6",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        " eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: new Date("4/25/18"),
      listId: 13,
      position: 2,
      isReady: false
    },
    {
      id: 7,
      name: "Task 7",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        " eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: new Date("4/23/18"),
      listId: 13,
      position: 3,
      isReady: false
    },
    {
      id: 8,
      name: "Task 8",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        " eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: new Date("5/22/18"),
      listId: 14,
      position: 1,
      isReady: true
    },
    {
      id: 9,
      name: "Task 9",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        " eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: new Date("6/11/18"),
      listId: 15,
      position: 1,
      isReady: false
    },
    {
      id: 10,
      name: "Task 10",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do" +
        " eiusmod tempor incididunt ut labore et dolore magna aliqua." +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      date: new Date("7/16/18"),
      listId: 15,
      position: 2,
      isReady: false
    }
  ];
  tasks: Task[];
  constructor() {}


  /**
   * Если в LocalStorage есть объект tasks, то берем данные из него
   * Иначе ипользуем предзаданный список задач
   */
  getData(): void {
    const lsTasks = JSON.parse(localStorage.getItem("tasks"));
    if (lsTasks) {
      this.tasks = [];
      for (let t of lsTasks) {
        t = new Task(t);
      }
      this.tasks = lsTasks;
    } else {
      this.tasks = Object.assign([], this.tasksExample);
    }
  }


  /**
   * Сбрасываем список задач на предзаданный
   */
  clearState(): void {
    this.tasks = [];
    this.tasks = Object.assign([], this.tasksExample);
  }

  /**
   * Получение массива задач по идентификатору списка
   * @param {number} id - listId
   * @returns {Task[]}
   */
  getTasksByListId(id: number): Task[] {
    return this.orderByPosition(this.tasks.filter(task => task.listId === id));
  }

  /**
   * Получение задачи по ее идентификатору
   * @param {number} id
   * @returns {Task}
   */
  getTaskById(id: number): Task {
    return this.tasks.find((t: Task) => {
      return t.id === id;
    });
  }

  /**
   * Трансляция события всем спискам задач об изменении идентификатора списка у одной из задач
   * @param {Task} task
   */
  changeTaskList(task: Task) {
    this.taskListChangedSource.next(task);
  }

  /**
   * Сортировка массива задач по позиции (по возрастанию)
   * @param {Task[]} tasks
   * @returns {Task[]}
   */
  orderByPosition(tasks: Task[]): Task[] {
    tasks.sort((a: any, b: any) => {
      if (a.position < b.position) {
        return -1;
      } else if (a.position > b.position) {
        return 1;
      } else {
        return 0;
      }
    });
    return tasks;
  }

  /**
   * Возвращает наибольшую позицию из массива задач по идентификатору списка
   * @param {number} id
   * @returns {number}
   */
  getTasksMaxPosition(id: number): number {
    let max = Math.max.apply(
      Math,
      this.getTasksByListId(id).map(task => {
        return task.position;
      })
    );
    if (max < 0) {
      max = 0;
    }
    return max;
  }

  /**
   * Осуществляет перерасчет позиций задач в списке
   * Вызывается при редавтировании/удалении/добавлении любой задачи
   * Возвращает отсортированный по позициям массив задач с корректными значениями позиций
   * @param {Task[]} tasks
   * @param {Task} task
   * @param {number} prevPosition
   * @returns {Task[]}
   */
  recalculatePositions(
    tasks: Task[],
    task?: Task,
    prevPosition?: number
  ): Task[] {
    if (task) {
      if (prevPosition > task.position) {
        tasks.forEach((t: Task, index: number) => {
          if (
            t.id !== task.id &&
            t.position >= task.position &&
            t.position < prevPosition
          ) {
            tasks[index].position = t.position + 1;
          }
        });
      } else {
        tasks.forEach((t: Task, index: number) => {
          if (
            t.id !== task.id &&
            t.position <= task.position &&
            t.position > prevPosition
          ) {
            tasks[index].position = t.position - 1;
          }
        });
      }
      tasks = this.orderByPosition(tasks);
    } else {
      tasks.forEach((t: Task, index: number) => {
        tasks[index].position = index + 1;
      });
    }
    this.updateTasks(tasks);
    return tasks;
  }

  updateTasks(tasks: Task[]): void {
    for (const task of tasks) {
      this.updateTask(task);
    }
  }

  /**
   * Обновляет задачу в сервисе для синхронизации списка задач с сервисом
   * @param {Task} task
   */
  updateTask(task: Task) {
    const oldTask = this.getTaskById(task.id);
    const index = this.tasks.indexOf(oldTask);
    this.tasks[index] = task;
  }

  /**
   * Добавляет задачу в сервис для синхронизации списка задач с сервисом
   * @param {Task} task
   */
  addTask(task: Task): number {
    task.id = this.getNextId();
    this.tasks.push(task);
    return task.id;
  }

  /**
   * Получение следующего ID задачи
   * @returns {number}
   */
  getNextId(): number {
    return (
      Math.max.apply(
        Math,
        this.tasks.map(task => {
          return task.id;
        })
      ) + 1
    );
  }

  /**
   * Удаляет задачу из сервиса для синхронизации списка задач с сервисом
   * @param {Task} task
   */
  removeTask(task: Task) {
    const oldTask = this.getTaskById(task.id);
    const index = this.tasks.indexOf(oldTask);
    this.tasks.splice(index, 1);
  }

  /**
   * Сохраняем список задач в LocalStorage
   */
  saveData(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}
