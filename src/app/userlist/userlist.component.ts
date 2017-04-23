import { HttpService } from '../http.service';
import { User } from '../shared/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'pm-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit, OnDestroy {

  usersList: User[] = [];
  private subscription: Subscription;
  constructor(private httpService: HttpService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.httpService.getAllUsers().subscribe(
    (data: any) => {
    for (const key of data) {
      this.usersList.push(key);
    }
    });
  }
  ngOnDestroy() {
    this.usersList = [];
    this.subscription.unsubscribe();
  }
  onAddUser() {
    this.router.navigate(['/newUser']);
  }

}
