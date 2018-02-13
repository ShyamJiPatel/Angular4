import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
	
	constructor(private router : Router, private user : UserService){}
	
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		console.log("Inside auth gaurd : "+this.user.isUserLoggedIn());
		if(this.user.isUserLoggedIn()){
			return true;
		}
		this.router.navigate(['/login']);
		return false;	
  }
}
