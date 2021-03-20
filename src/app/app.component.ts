import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { USERS } from './mock-users';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-homework11';

  sendButtonActive = false;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'addressname',
    'zipcode',
    'city',
    'street',
    'suite',
    'action',
  ];

  dataSource;

  userForm: FormGroup;

  usersArray = new FormArray([]);
  // getUsersArray: any;
  // dataSource: MatTableDataSource<any>;

  constructor(public users: UsersService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.users.getUsers().subscribe((users) => {
      this.userForm = this.fb.group({
        users: this.fb.array([]),
      });
      const usersFormArray = this.userForm.get('users') as FormArray;
      this.dataSource = new MatTableDataSource(users);
      users.forEach((user, index) => usersFormArray.insert(index, this.fb.group ({
        id: this.fb.control(user.id),
        name: this.fb.control(user.name),
        username: this.fb.control(user.username),
        email: this.fb.control(user.email),
        addressname: this.fb.control(user.addressname)
      } )));
    });

    for (let i = 0; i < USERS.length; i++) {
      const element = USERS[i];
      // let id = this.getNumberToFormControl(element.id);
      // let name = this.getStringToFormControl(element.name);
      // let username = this.getStringToFormControl(element.username);
      // let email = this.getStringToFormControl(element.email);
      // let zipcode = this.getStringToFormControl(element.address.zipcode);
      // let city = this.getStringToFormControl(element.address.city);
      // let street = this.getStringToFormControl(element.address.street);
      // let suite = this.getStringToFormControl(element.address.suite);
      // let phone = this.getStringToFormControl(element.phone);
      // let website = this.getStringToFormControl(element.website);

      let userForm = this.fb.group({
        id: this.fb.control(element.id),
        name: this.fb.control(element.name),
        username: this.fb.control(element.username),
        email: this.fb.control(element.email),
        zipcode: this.fb.control(element.address.zipcode),
        city: this.fb.control(element.address.city),
        street: this.fb.control(element.address.street),
        suite: this.fb.control(element.address.suite),
        phone: this.fb.control(element.phone),
        website: this.fb.control(element.website),
      });
      this.usersArray.push(userForm);
      console.log('>>>>>>>>>>', i);
    }
  }

  get getUsersArray(): FormArray {
    return this.userForm.get('usersArray') as FormArray;
  }

  getStringToFormControl(str: string): FormControl {
    return new FormControl(str, Validators.required);
  }

  getNumberToFormControl(num: number): FormControl {
    return new FormControl(num, Validators.required);
  }

  filterFunction(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sendUser(): void {
    //   console.log(this.users.users.length);
    //   // this.dataSource = new MatTableDataSource(this.users.users);
    //   const user = new User();
    //   const userId = this.userForm.get('id').value;
    //   user.name = this.userForm.get('name').value;
    //   user.username = this.userForm.get('username').value;
    //   user.email = this.userForm.get('email').value;
    //   user.address.zipcode = this.userForm.get('zipcode').value;
    //   user.address.city = this.userForm.get('city').value;
    //   user.address.street = this.userForm.get('street').value;
    //   user.address.suite = this.userForm.get('suite').value;
    //   user.phone = this.userForm.get('phone').value;
    //   user.website = this.userForm.get('website').value;
    //   if (userId === 0 || userId == null) {
    //     user.id = this.users.users.length + 1;
    //     this.users.users.push(user);
    //     this.users.postUser(user);
    //     this.userForm.reset();
    //   } else {
    //     const userIndex: number = this.users.users.findIndex(
    //       (o) => o.id === userId
    //     );
    //     this.users.users[userIndex].id = userId;
    //     this.users.users[userIndex].name = user.name;
    //     this.users.users[userIndex].username = user.username;
    //     this.users.users[userIndex].email = user.email;
    //     this.users.users[userIndex].address.zipcode = user.address.zipcode;
    //     this.users.users[userIndex].address.city = user.address.city;
    //     this.users.users[userIndex].address.street = user.address.street;
    //     this.users.users[userIndex].address.suite = user.address.suite;
    //     this.users.users[userIndex].phone = user.phone;
    //     this.users.users[userIndex].website = user.website;
    //     this.users.putUser(user, userIndex);
    //     this.userForm.reset();
    //   }
  }

  editUser(userToForm: any): void {
    // this.userForm.get('id').setValue(userToForm.id);
    // this.userForm.get('name').setValue(userToForm.name);
    // this.userForm.get('username').setValue(userToForm.username);
    // this.userForm.get('email').setValue(userToForm.email);
    // this.userForm.get('zipcode').setValue(userToForm.zipcode);
    // this.userForm.get('city').setValue(userToForm.city);
    // this.userForm.get('street').setValue(userToForm.street);
    // this.userForm.get('suite').setValue(userToForm.suite);
    // this.userForm.get('phone').setValue(userToForm.phone);
    // this.userForm.get('website').setValue(userToForm.website);
  }

  deleteUser(i: number): void {
    this.users.users.splice(i, 1);
    this.users.deleteUser(i);
  }

  resetForm(): void {
    this.userForm.reset();
  }
  // }  getNumberToFormControl(id: number) {
  //     throw new Error('Method not implemented.');
  //   }
  // getStringToFormControl(name: string) {
  //   throw new Error('Method not implemented.');

  get;
}
