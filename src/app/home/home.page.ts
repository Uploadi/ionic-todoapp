import {Component} from '@angular/core';
import {Storage} from '@capacitor/storage';

interface ToDo {
  id: number;
  task: string;
  complete: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: Array<ToDo>;
  newTodo: string;

  constructor() {
    this.todos = [];
    this.get();
  }

  updateTodo(todo) {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === todo.id) {
        this.todos[i].complete = !this.todos[i].complete;
        this.save();
        break;
      }
    }
  }

  private save() {
    Storage.set({key: 'todos', value: JSON.stringify(this.todos)});
  }

  private get() {
    Storage.get({key: 'todos'}).then(res => {
      this.todos = JSON.parse(res.value) || [];
      console.log(res.value);
    });
  }

  private addTodo() {
    if (this.newTodo) {
      this.todos.push({
        id: Date.now(),
        task: this.newTodo,
        complete: false,
      });
      this.newTodo = '';
      this.save();
    }
  }

  private hasCompleted() {
    return this.todos.filter(todo => todo.complete).length > 0;
  }

  private deleteTodo(todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.save();
  }
}
