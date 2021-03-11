import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { UsersService } from './users.service';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-homework11';

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'}
    ]
  };

  constructor(public users: UsersService){}

  ngOnInit(): void {
    this.users.loadUsers()
  }

  filterFunction(){

  }
}
