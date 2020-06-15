export class Task {
  constructor(object: any) {
    this.id = object.id;
    this.name = object.name;
    this.description = object.description;
    if (!(object.date instanceof Date)) {
      object.date = new Date(object.date);
    }
    this.date = object.date;
    this.position = object.position;
    this.listId = object.listId;
    this.isReady = object.isReady;
  }

  id?: number;
  name: string;
  description: string;
  date: Date;
  listId: number;
  position: number;
  isReady: boolean;
}
