import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	message:string="";
	email:string="";
	pwd:string="";
	user:User;

  constructor(private router : Router, private userService : UserService) { 
	console.log("Inside Login Controller");
  }

  ngOnInit() {
	  this.user=new User();
  }
  
  signin(){
	  if(this.user){
		  this.userService.login(this.user.email, this.user.pwd)
		  .subscribe(user => {
			    this.userService.setUserLoggedIn();
				this.userService.setActiveUser(user);
				this.router.navigate(['/dashboard']);
			  },
			  err => {
				console.log(err);
				this.message="Invalid username or password.";
			  }
			);
	  }else{
		  this.message="Invalid username or password.";
	  }
  }
}
