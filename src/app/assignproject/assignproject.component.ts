import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/project';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/employee';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-assignproject',
  templateUrl: './assignproject.component.html',
  styleUrls: ['./assignproject.component.css']
})
export class AssignprojectComponent implements OnInit {
	
	 projects : Project[];
	 employees : Employee[];
	 selectedProject:Project;
	 selectedProjectEmployees:Employee[];
	 selection:Employee[]=[];
	 selectionIds:any[]=[];
	 updated:boolean=false;
	 activeUser:User;

  constructor(private projectService : ProjectService, private employeeService : EmployeeService, private router : Router, private userService:UserService) {
	this.activeUser=userService.getActiveUser();
  }

  ngOnInit() {
	  console.log("Inside ProjectComponent");
	  
	  this.getAllEmployees();
	  this.getAllProjects();
	}

	getAllProjects() {
		return this.projectService.findAll().subscribe(
		  projects => {
			this.projects = projects;
	  
			if(this.projects.length>0){
				this.selectedProject=this.projects[0];
				this.changeProject();
			}
		  },
		  err => {
			console.log(err);
		  }
		);
	}
	
	getAllEmployees() {
		return this.employeeService.findAll().subscribe(
		  employees => {
			this.employees = employees;
		  },
		  err => {
			console.log(err);
		  }
		);
	}
	
	updateProject(project:Project){
		if(project){
			this.projectService.updateProject(project)
			.subscribe(res=> {
				this.router.navigate(['/dashboard/project']);
			});
		}
	}
	
	assignEmployeesToProject() {
		this.selectedProjectEmployees = [];
		this.selectedProjectEmployees = this.selection;		
		
		if (this.selectedProjectEmployees !== undefined) {
			this.selectedProject.employees=this.selectedProjectEmployees;
			this.updateProject(this.selectedProject);
		}
	}

	changeProject() {
		if (this.selectedProject != null
				|| this.selectedProject != undefined) {
			this.selection = [];
			
			 this.selectedProject.employees.forEach(emp => {
				this.employees.every(childEmp => {
					if (emp.id == childEmp.id) {
						this.selection.push(childEmp);
						return false;
					}else{
						return true;
					}
				})
			});
		}
	}

	// toggle selection for a selected employee
	toggleSelection(employee) {
		let idx = this.selection.indexOf(employee);
		if (idx > -1) {
			this.selection.splice(idx, 1);
		}else {
			this.selection.push(employee);
		}
	}
	clear(){
		this.selection = [];
	}
	
	cancel(){
		this.selectedProject = null;
	}

}
