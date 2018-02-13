import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

	 addMode : boolean;
	 deleteMode : boolean;
	 updateMode : boolean;
	 detailMode : boolean;
	 submitted : boolean;
	 activeUser:User;
	
	 projects : Project[];
	
	 project : Project = new Project();
	
	 searchData:Project=new Project();

	constructor(private projectService : ProjectService, private userService:UserService) {
		this.activeUser=userService.getActiveUser();
	}

	ngOnInit() {
	  console.log("Inside ProjectComponent");
	  this.getAllProjects();
	}

	getAllProjects() {
		return this.projectService.findAll().subscribe(
		  projects => {
			this.projects = projects;
		  },
		  err => {
			console.log(err);
		  }
		);
	}
	
	addProjectPage(){
		this.resetMode();
		this.project = new Project();
		this.addMode = true;
	}
	
	editProjectPage(project){
		if(project){
			this.resetMode();
			this.updateMode = true;
			this.project=JSON.parse(JSON.stringify(project))
		}
	}
	
	deleteProject(id){
		this.projectService.deleteProjectById(id)
		.subscribe(res=> {
				this.getAllProjects();
		});
	}
	
	detailProjectPage(project){
		if(project){
			this.resetMode();
			this.detailMode = true;
			this.project=JSON.parse(JSON.stringify(project))
		}
	}
	
	resetMode(){
		this.addMode = false;
		this.deleteMode = false;
		this.updateMode = false;
		this.submitted = false;
		this.detailMode = false
	}
	
	clear(){
		this.project = new Project();
	}
	
	cancel(){
		this.resetMode();
		this.project = new Project();
	}
	
	saveProject(){
		if(this.project){
			this.projectService.saveProject(this.project)
			.subscribe(res=> {
				this.submitted=true;
				this.getAllProjects();
			});
		}
	}
	updateProject(){
		if(this.project){
			this.projectService.updateProject(this.project)
			.subscribe(res=> {
				this.submitted=true;
				this.getAllProjects();
			});
		}
	}
	
	goBack(){
		this.resetMode();
		this.project = new Project();
	}
}
