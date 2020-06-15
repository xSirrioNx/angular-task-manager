import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TasksListDialogComponent } from "./tasks-list-dialog.component";

describe("TasksListDialogComponent", () => {
  let component: TasksListDialogComponent;
  let fixture: ComponentFixture<TasksListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListDialogComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
