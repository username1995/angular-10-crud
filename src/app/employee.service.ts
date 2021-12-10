import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
//import { HttpHeaders } from 'http-headers';
import { HttpHeaders } from '@angular/common/http';
import { Employee } from './employee';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public usersJson2: any[];
  private baseURL = "http://localhost:8081/http://172.18.17.150:8000/sap/opu/odata/sap/ZEMPLOYEES_SRV/EMPLOYEESet?$format=json";

  constructor(private httpClient: HttpClient) { }
  
  getEmployeesList(): Observable<any>{


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('developer:Down1oad')
      })
    };
    return this.httpClient.get(`${this.baseURL}`, httpOptions).pipe(
      map((response) => {
        console.log(response);
        this.usersJson2 = Array.of(response);
        console.log(this.usersJson2);
        return response;
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    )
  }

  createEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
