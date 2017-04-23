import { HttpService } from '../http.service';
import { User } from '../shared/User';
import { Component, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'pm-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnChanges {
  userForm: FormGroup;
  private subscription: Subscription;
  private userId: number;
  private user: User;
  private isNew: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (param: any) => {
        if (param.hasOwnProperty('id')) {
          this.isNew = false;
          this.userId = +param['id'];
          this.httpService.getUserById(this.userId).subscribe(
            (data: any) =>  {this.user = new User(
                              data.id,
                              data.name,
                              data.address,
                              data.phone);
          });
        } else {
          this.isNew = true;
          this.user = null;
        }
      });
  }
  ngOnChanges(changes): void {
    if (changes.user.currentValue === null) {
      this.isNew = true;
      this.user = {id: null, name : null, address: null, phone: null};
    }else {
      this.isNew = false;
    }
  }
  onSubmit(user: User) {
    const newUser = new User(user.id, user.name, user.address, user.phone);
    if (!this.isNew) {
     this.httpService.upDateUser(newUser).subscribe(
                      (data: any)  => { this.user = new User(
                                                      data.id,
                                                      data.name,
                                                      data.address,
                                                      data.phone);
      },
      (error) => { console.log('Something went wrong');
                   this.router.navigate(['/error']); });
    } else {
      this.user = newUser;
      this.httpService.createNewUser(user).subscribe(
                       (data: any) => { this.user = new User (
                                                        data.id,
                                                        data.name,
                                                        data.address,
                                                        data.phone);
      },
      (error) => { console.log('Something went wrong');
                   this.router.navigate(['/error']); });
    }
    this.router.navigate(['../']);
  }
  onCancel() {
    this.router.navigate(['../']);
  }
  onDelete() {
    console.log(this.user);
    this.httpService.deleteUser(this.user);
    this.router.navigate(['/']);
  }

}
