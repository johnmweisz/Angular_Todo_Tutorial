import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/Todo';
import { splitClasses } from '@angular/compiler';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo;
  @Output() deleteTodo:EventEmitter<Todo> = new EventEmitter;
  
  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }
  setClasses(){
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }
  onToggle(todo){
    //toggles classes
    todo.completed = !todo.completed;
    //toggles database
    this.todoService.toggleCompleted(todo).subscribe();
  }
  onDelete(todo){
    this.deleteTodo.emit(todo);
  }
}
