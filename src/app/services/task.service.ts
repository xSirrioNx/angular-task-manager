import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Task} from './task';

@Injectable()
export class TaskService {

  private taskUrl = 'api/task';  // URL to web api

  const;
  tasks: Task[] = [
    {
      id: 1,
      name: 'Task 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
      ' eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: new Date('1/1/16'),
      listId: 11
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
      ' eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: new Date('1/2/16'),
      listId: 12
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
      ' eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: new Date('1/3/16'),
      listId: 13
    },
    {
      id: 4,
      name: 'Task 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
      ' eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: new Date('1/4/16'),
      listId: 13
    },
    {
      id: 5,
      name: 'Task 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
      ' eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: new Date('1/5/16'),
      listId: 14
    },
    {
      id: 6,
      name: 'Task 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
      ' eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: new Date('1/6/16'),
      listId: 15
    },
    {
      id: 7,
      name: 'Task 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
      ' eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: new Date('1/7/16'),
      listId: 15
    },
    {
      id: 8,
      name: 'Task 8',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
      ' eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: new Date('1/8/16'),
      listId: 11
    },
    {
      id: 9,
      name: 'Task 9',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
      ' eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: new Date('1/9/16'),
      listId: 13
    },
    {
      id: 10,
      name: 'Task 10',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' +
      ' eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: new Date('1/10/16'),
      listId: 12
    },
  ];

  constructor(private http: HttpClient) {
  }
  getAllTasks (): Task[] {
    return this.tasks;
  }
  getTasksByListId (id: number): Task[] {
    return this.tasks.filter(task => task.listId === id);
  }
}
