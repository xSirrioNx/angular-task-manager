import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {TasksList} from './tasks-list';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TasksListService {
  private tasksListUrl = 'api/taskList';  // URL to web api
  constructor(private http: HttpClient) {}

  const
  tasksList: TasksList[] = [
    {id: 11, name: 'Sprint 1'},
    {id: 12, name: 'Sprint 2'},
    {id: 13, name: 'Sprint 3'},
    {id: 14, name: 'Sprint 4'},
    {id: 15, name: 'Sprint 5'}
  ];

  getTasksLists (): TasksList[] {
    return this.tasksList;
  }
}
