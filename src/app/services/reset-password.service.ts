import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
private baseUrl:string = "http://localhost:5148/api/ApplicationUser"
  constructor(private http:HttpClient) { }

  sendResetPassWordLink(email:string){
    return this.http.post<any>(`${this.baseUrl}/send-reset-email/${email}`, {});
  }
  resetPassword(resetPasswordObj:ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/reset-password`,resetPasswordObj);
  }
}
