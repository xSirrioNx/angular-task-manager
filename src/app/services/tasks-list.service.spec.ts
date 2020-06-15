import { TestBed, inject } from "@angular/core/testing";

import { TasksListService } from "./tasks-list.service";

describe("TasksListService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksListService]
    });
  });

  it(
    "should be created",
    inject([TasksListService], (service: TasksListService) => {
      expect(service).toBeTruthy();
    })
  );
});
