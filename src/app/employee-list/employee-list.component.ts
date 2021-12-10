import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee'
import { EmployeeService } from '../employee.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];
   usersJson: any[];
   public myArr: Employee[]=[];
  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
   
    this.getEmployees();
  }

 private populateCode(){

    for( let i in this.usersJson) {   
       for( let j in this.usersJson[i]){
          for( let k in this.usersJson[i][j]){
            let customObj = new Employee();
            customObj.Id = this.usersJson[i][j][k].Id;
            customObj.Name = this.usersJson[i][j][k].Name;
            customObj.Age = this.usersJson[i][j][k].Age;
            this.myArr.push(customObj);
          }
       }
    }
}
  private getEmployees(){
    this.employeeService.getEmployeesList().subscribe((data: any[]) => {
     this.usersJson =  data;
     this.populateCode();
 });


  }

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })
  }
}
