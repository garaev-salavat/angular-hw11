import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-homework11';

  constructor(public users: UsersService){}

  ngOnInit(): void {
    this.users.loadUsers()
  }

  filterFunction(){

  }
}
