import { Injectable } from '@angular/core';
import { User } from './user';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {
	
	private apiUrl = 'http://localhost:8080/user';
	private isLoggedIn:boolean = false;
	private activeUser:User;

	constructor(private http : Http) { 
		console.log("Inside UserService Constructor");
	}
	
	public isUserLoggedIn():boolean{
		return this.isLoggedIn;
	}
	
	public setUserLoggedIn(){
		this.isLoggedIn = true;
	}
	
	public setUserLoggedOut(){
		this.isLoggedIn = false;
	}
	
	public setActiveUser(user:User){
		this.activeUser=user;
	}
	
	public getActiveUser(){
		return this.activeUser;
	}
	
	saveUser(user: User): any {
		  let body = JSON.stringify(user);		  
		  let headers = new Headers({'Content-Type': 'application/json'});
		  let options = new RequestOptions({ headers: headers });
		  return this.http.post(this.apiUrl, body, options)
		  .map((res: Response) => res.status)
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	
	login(email:string, pwd:string): Observable<User> {
		return this.http.get(this.apiUrl + "/" + email + "/" + pwd)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

}
