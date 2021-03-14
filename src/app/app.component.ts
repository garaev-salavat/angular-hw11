import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, User } from './user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-homework11';

  sendButtonActive: boolean = false;

  userForm: FormGroup;

  constructor(public users: UsersService, fb: FormBuilder, addresfb: FormBuilder) {
    users.loadUsers();

    this.userForm = fb.group({
      id: fb.control(0),
      name: fb.control(null, Validators.required),
      username: fb.control(null),
      email: fb.control(null),
          zipcode: fb.control(''),
          city: fb.control(''),
          street: fb.control(''),
          suite: fb.control(''),
      phone: fb.control(null),
      website: fb.control(null),
    });
  }

  ngOnInit(): void {}

  filterFunction() {}

  sendUser(i?: number): void {
    console.log(this.users.users.length);

    let user: User = new User();
    let userId = this.userForm.get('id').value;
    

    user.name = this.userForm.get('name').value;
    user.username = this.userForm.get('username').value;
    user.email = this.userForm.get('email').value;
    
    user.address.zipcode = this.userForm.get('zipcode').value;
    user.address.city = this.userForm.get('city').value;
    user.address.street = this.userForm.get('street').value;
    user.address.suite = this.userForm.get('suite').value;

    user.phone = this.userForm.get('phone').value;
    user.website = this.userForm.get('website').value;

      if (userId === 0 || userId == null) {
        user.id = this.users.users.length + 1;
        this.users.users.push(user);
        this.users.postUser(user);
        this.userForm.reset();
      } else {
        let userIndex: number = this.users.users.findIndex((o) => o.id === userId)
        this.users.users[userIndex].id = userId;
        this.users.users[userIndex].name = user.name;
        this.users.users[userIndex].username = user.username;
        this.users.users[userIndex].email = user.email;
        this.users.users[userIndex].address.zipcode =  user.address.zipcode;
        this.users.users[userIndex].address.city = user.address.city;
        this.users.users[userIndex].address.street = user.address.street;
        this.users.users[userIndex].address.suite = user.address.suite;

        this.users.users[userIndex].phone = user.phone;
        this.users.users[userIndex].website = user.website;
        this.users.putUser(user, userIndex);
        this.userForm.reset();
      }
    }


  editUser(userToForm: any) {
    this.userForm.get('id').setValue(userToForm.id);
    this.userForm.get('name').setValue(userToForm.name);
    this.userForm.get('username').setValue(userToForm.username);
    this.userForm.get('email').setValue(userToForm.email);
    this.userForm.get('zipcode').setValue(userToForm.zipcode);
    this.userForm.get('city').setValue(userToForm.city);
    this.userForm.get('street').setValue(userToForm.street);
    this.userForm.get('suite').setValue(userToForm.suite);
    this.userForm.get('phone').setValue(userToForm.phone);
    this.userForm.get('website').setValue(userToForm.website);
  }

  deleteUser(i: number) {
    this.users.users.splice(i, 1);
    this.users.deleteUser(i);
  }

  resetForm() {
    this.userForm.reset();
  }
}
