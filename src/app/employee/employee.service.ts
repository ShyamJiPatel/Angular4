import { Injectable } from '@angular/core';
import { Employee } from './employee';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class EmployeeService {

    private apiUrl = 'http://localhost:8080/employee';

	constructor(private http : Http) { }
	
	findAll() : Observable<Employee[]> {
		return this.http.get(this.apiUrl)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json()|| 'Server error'));
	}
	
	findById(id: number): Observable<Employee> {
		return this.http.get(this.apiUrl+"/"+id)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	saveEmployee(employee: Employee): any {
		  let body = JSON.stringify(employee);		  
		  let headers = new Headers({'Content-Type': 'application/json'});
		  let options = new RequestOptions({ headers: headers });
		  console.log("Inside saveEmployee in employee service : " + JSON.stringify(employee));
		  return this.http
		  .post(this.apiUrl, body, options)
		  .map((res:Response) => res.status)
		  .catch((error:any) => Observable.throw(error.json() || 'Server error'));
	}

	deleteEmployeeById(id: number): Observable<boolean> {
		return this.http.delete(this.apiUrl +"/"+ id)
		.map((res: Response) => res.status)
		.catch((error:any) => Observable.throw(error.json()|| 'Server error'));
	}

	updateEmployee(employee: Employee): any {
		let body = JSON.stringify(employee);
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: headers });
		return this.http
		.put(this.apiUrl, body, options )
		.map((res: Response) => res.status)
		.catch((error:any) => Observable.throw(error.json() || 'Server error'));
	}

}
