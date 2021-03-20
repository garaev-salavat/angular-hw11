import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './user.interface';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'angular-homework11';

  sendButtonActive = false;

  displayedColumns: string[] = ['name', 'email', 'addressname', 'action'];

  dataSource;

  userForm: FormGroup;

  usersFormArray: FormArray;

  constructor(public users: UsersService, private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.usersFormArray.controls);
  }

  ngOnInit(): void {
    this.users.getUsers().subscribe((users) => {
      this.userForm = this.fb.group({
        users: this.fb.array([]),
      });
      this.usersFormArray = this.userForm.get('users') as FormArray;

      users.forEach((user, index) =>
        this.usersFormArray.insert(
          index,
          this.fb.group({
            name: this.fb.control(user.name),
            username: this.fb.control(user.username),
            email: this.fb.control(user.email),
            addressname: this.fb.control(user.addressname),
          })
        )
      );

      this.dataSource = new MatTableDataSource(this.usersFormArray.controls);
      this.dataSource.filterPredicate = (row, filter) => {
        const user = row.value as User;
        return (
          user.username
            .trim()
            .toLowerCase()
            .includes(filter.trim().toLowerCase()) ||
          user.email
            .trim()
            .toLowerCase()
            .includes(filter.trim().toLowerCase()) ||
          user.addressname
            .trim()
            .toLowerCase()
            .includes(filter.trim().toLowerCase())
        );
      };
    });
  }

  filterFunction(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
  }

  deleteUser(i: number): void {
    this.usersFormArray.removeAt(i);
    this.dataSource = new MatTableDataSource(this.usersFormArray.controls);
  }

  create(i: number): void {
    this.usersFormArray.insert(i + 1, this.fb.group({
      name: this.fb.control(''),
      username: this.fb.control(''),
      email: this.fb.control(''),
      addressname: this.fb.control(''),
    }));
    this.dataSource = new MatTableDataSource(this.usersFormArray.controls);
  }
}
