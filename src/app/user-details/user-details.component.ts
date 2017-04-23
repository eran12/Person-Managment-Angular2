import { HttpService } from '../http.service';
import { User } from '../shared/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/RX';
import { error } from 'util';

@Component({
  selector: 'pm-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private userID: number;
  selectedUser: User;
  constructor(private httpService: HttpService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
    (param: any) => {
    this.userID = param['id'];
    });
    this.subscription.unsubscribe();
      this.subscription = this.httpService.getUserById(this.userID).subscribe(
      (data: any)  => {
        this.selectedUser = new User(
                              data.id,
                              data.name,
                              data.address,
                              data.phone);
      },
      error => console.log(error));
    }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
  onEdit() {
    this.router.navigate(['/userEdit', this.selectedUser.id]);
  }
  onDelete() {
    this.subscription = this.httpService.deleteUser(this.selectedUser).subscribe(
     (data: any) => console.log(data),
      error => console.error(error)
    );
  }
  onBack() {
    this.router.navigate(['../']);
  }
}
