import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl6:string = "http://localhost:5148/api/JobData/"
  private baseUrl5:string = "http://localhost:5148/api/Tenant/"
  private baseUrl7 = 'http://localhost:5148/api/Editable/'
  private baseUrl8:string = "http://localhost:5148/api/User/"
  private baseUrl9:string = "http://localhost:5148/api/TenantSubscribe/"
  private userPayload:any;
  constructor(private http: HttpClient, private router:Router) {
    this.userPayload = this.decodedToken();
   }
signup(usrObj:any){
  return this.http.post<any>(`${this.baseUrl8}register`,usrObj)
}
signupAdmin(usrObj:any){
  return this.http.post<any>(`${this.baseUrl5}register`,usrObj)
}
UpdateTenantStatus(usrObj:any){
  return this.http.put<any>(`${this.baseUrl9}update_tenantStatus`,usrObj)
}
Userlogin(loginObj:any){
  return this.http.post<any>(`${this.baseUrl8}Authenticate`,loginObj)
}
Adminlogin(loginObj:any){
  return this.http.post<any>(`${this.baseUrl5}Authenticate`,loginObj)
}

storeToken(tokenValue:string){
  localStorage.setItem('token',tokenValue)
}
storeRefreshToken(tokenValue: string){
  localStorage.setItem('refreshToken',tokenValue)
}
getToken(){
  return localStorage.getItem('token')
}
getRefreshToken(){
  return localStorage.getItem('refreshToken')
}
isLoggedIn(){
  return !!localStorage.getItem('token')
}
decodedToken(){
  const jwtHelper = new JwtHelperService();
  const token = this.getToken()!;
  return jwtHelper.decodeToken(token)
}
getUserNameFromToken(){
  if(this.userPayload)
  return this.userPayload.name;
}
getRoleFromToken(){
  if(this.userPayload)
  return this.userPayload.role;
}
signOut(){
  localStorage.clear();
  this.router.navigate(['usrLogin'])
}
renewToken(tokenApi : TokenApiModel){
  return this.http.post<any>(`${this.baseUrl8}refresh`,tokenApi)
}
PostData(usrObj : any){
  return this.http.post<any>(`${this.baseUrl6}add_JobData`,usrObj)
}

DeleteTenant(TenantName : string){
  return this.http.delete<any>(`${this.baseUrl9}delete_tenant/`+TenantName)
  .pipe(map((res:any)=>{
    return res;
  }))
}
DeleteUser(usrId : string){
  return this.http.delete<any>(`${this.baseUrl8}delete_User/`+usrId)
  .pipe(map((res:any)=>{
    return res;
  }))
}
DeleteUserJobData(usrId : string){
  return this.http.delete<any>(`${this.baseUrl6}delete_UserJobdata/`+usrId)
  .pipe(map((res:any)=>{
    return res;
  }))
}
UpdateUserData(data : any){
  return this.http.put<any>(`${this.baseUrl8}update_UserData`,data)
  .pipe(map((res:any)=>{
    return res;
  }))
}
UpdateUserJobData(data : any){
  return this.http.put<any>(`${this.baseUrl6}update_UserJobData`,data)
  .pipe(map((res:any)=>{
    return res;
  }))
}
GetTenantDataByUserId(userId:any){
  return this.http.get<any>(`${this.baseUrl8}get_TenantId_by_UserId?usrId=`+userId)
  .pipe(map((res:any)=>{
    return res;
  }))
}
GetUserDataByTenantId(usrTenantId:any){
  return this.http.get<any>(`${this.baseUrl8}get_Users_by_TenantId?usrTenantId=`+usrTenantId)
  .pipe(map((res:any)=>{
    return res;
  }))
}
getLabelDetails(usrTenantId:any){
  return this.http.get<any>(`${this.baseUrl7}get_Inputs_by_TenantId?TenantId=`+usrTenantId)
  .pipe(map((res:any)=>{
    return res;
  }))
}
getUsersJobDetails(usrTenantId:any){
  return this.http.get<any>(`${this.baseUrl6}get_JobData_by_TenantId?TenantId=`+usrTenantId)
  .pipe(map((res:any)=>{
    return res;
  }))
}
getUserJobDetails(usrId:any){
  return this.http.get<any>(`${this.baseUrl6}get_JobData_by_UsrId?UsrId=`+usrId)
  .pipe(map((res:any)=>{
    return res;
  }))
}
PostLabel(data : any){
  return this.http.post<any>(`${this.baseUrl7}add_label`,data)
  .pipe(map((res:any)=>{
    return res;
  }))
}
tenantSubscribe(usrObj:any){
  return this.http.post<any>(`${this.baseUrl9}subscribe`,usrObj)
}
}
