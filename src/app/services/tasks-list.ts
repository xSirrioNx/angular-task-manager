export class TasksList {
  constructor(object: any) {
    this.id = object.id;
    this.name = object.name;
    this.position = object.position;
  }
  id?: number;
  name: string;
  position: number;
}
