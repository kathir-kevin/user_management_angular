import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:5148/api/ApplicationUser/';
  private baseUrl1: string = 'http://localhost:5148/api/SuperAdmin/';
  private baseUrl2: string = 'http://localhost:5148/api/TenantSubscribe/';

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.baseUrl)
  }
  getSuperAdmins(){
    return this.http.get<any>(this.baseUrl1)
  }
  getTenants(){
    return this.http.get<any>(this.baseUrl2)
  }
}
