import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { UserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

	 addMode : boolean;
	 deleteMode : boolean;
	 updateMode : boolean;
	 detailMode : boolean;
	 submitted : boolean;
	 activeUser:User;
	
	 employees : Employee[];
	
	 employee : Employee = new Employee();
	
	 searchData:Employee=new Employee();

	constructor(private employeeService : EmployeeService, private userService:UserService) {
		this.activeUser=userService.getActiveUser();
	}
	
	ngOnInit() {
	  console.log("Inside EmployeeComponent");
	  this.getAllEmployees();
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
	
	addEmployeePage(){
		this.resetMode();
		this.employee = new Employee();
		this.addMode = true;
	}
	
	editEmployeePage(employee){
		if(employee){
			this.resetMode();
			this.updateMode = true;
			this.employee=JSON.parse(JSON.stringify(employee))
		}
	}
	
	deleteEmployee(id){
		this.employeeService.deleteEmployeeById(id)
		.subscribe(res=> {
				this.getAllEmployees();
		});
	}
	
	detailEmployeePage(employee){
		if(employee){
			this.resetMode();
			this.detailMode = true;
			this.employee=JSON.parse(JSON.stringify(employee))
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
		this.employee = new Employee();
	}
	
	cancel(){
		this.resetMode();
		this.employee = new Employee();
	}
	
	saveEmployee(){
		if(this.employee){
			this.employeeService.saveEmployee(this.employee)
			.subscribe(res=> {
				this.submitted=true;
				this.getAllEmployees();
			});
		}
	}
	updateEmployee(){
		if(this.employee){
			this.employeeService.updateEmployee(this.employee)
			.subscribe(res=> {
				this.submitted=true;
				this.getAllEmployees();
			});
		}
	}
	
	goBack(){
		this.resetMode();
		this.employee = new Employee();
	}
}
