import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'
   ]
})
export class HeaderComponent implements OnInit {
	
  today = Date.now();

  constructor(private router : Router, private user : UserService) {}

  ngOnInit() {
	  setInterval(()=>{
		this.today = Date.now();
	}, 1000 );
  }
  
  public logoutUser(event){
	  event.preventDefault();
	  this.user.setUserLoggedOut();
	  this.router.navigate(['/login']);
	  return false;
  }
  
  public isUserLoggedIn(){
	  return this.user.isUserLoggedIn();
  }
}
