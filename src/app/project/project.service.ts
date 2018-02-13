import { Injectable } from '@angular/core';
import { Project } from './project';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProjectService {

    private apiUrl = 'http://localhost:8080/project';

	constructor(private http : Http) { }
	
	findAll() : Observable<Project[]> {
		return this.http.get(this.apiUrl)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
	
	findById(id: number): Observable<Project> {
		return this.http.get(this.apiUrl+"/"+id)
		.map((res: Response) => res.json())
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	saveProject(project: Project): any {
		  let body = JSON.stringify(project);		  
		  let headers = new Headers({'Content-Type': 'application/json'});
		  let options = new RequestOptions({ headers: headers });
		  return this.http.post(this.apiUrl, body, options)
		  .map((res: Response) => res.status)
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	deleteProjectById(id: number): Observable<boolean> {
		return this.http.delete(this.apiUrl +"/"+ id)
		.map((res: Response) => res.status)
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	updateProject(project: Project): any {
		let body = JSON.stringify(project);
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({ headers: headers });
		console.log("Inside update project "+project);
		return this.http
		.put(this.apiUrl, body, options )
		.map((res: Response) => res.status)
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

}
