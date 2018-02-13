import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	
  activeUser:User;

  constructor(private userService:UserService) {
	this.activeUser=userService.getActiveUser();
  }

  ngOnInit() {
  }

}
