import { User } from '../shared/User';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'pm-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {

 @Input() userData: User;
 @Input() userId: number;
}
