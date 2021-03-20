import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Users } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users;
  users1;

  constructor(private http: HttpClient) {
    this.loadUsers;
  }

  loadUsers() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data) => {
        this.users = data;
      });
  }

  getUsers(): Observable<Users> {
    return this.http.get(
      'https://jsonplaceholder.typicode.com/users'
    ) as Observable<Users>;
  }

  deleteUser(i: number) {
    return this.http
      .delete('https://jsonplaceholder.typicode.com/users/' + i)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .subscribe((data) => {
        console.log('delete', data);
      });
  }

  postUser(user: User) {
    return this.http
      .post('https://jsonplaceholder.typicode.com/users', user)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .subscribe((data) => {
        console.log('Добавление POST', data);
      });
  }

  putUser(user: User, userIndex: number) {
    return this.http
      .put('https://jsonplaceholder.typicode.com/users/' + userIndex, user)
      .pipe(
        map((data) => {
          return data;
        })
      )
      .subscribe((data) => {
        console.log('Изменение PUT', data);
      });
  }
}
