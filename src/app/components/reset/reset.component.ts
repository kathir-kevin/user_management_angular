import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmPasswordValidator } from 'src/app/helper/confirm-password.validator';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit{
  resetPasswordForm!:FormGroup;
  emailToReset!:string;
  emailToken!:string;
  resetPasswordObj = new ResetPassword();
  constructor(private fb:FormBuilder, private router:Router,private activatedRoute:ActivatedRoute, private resetService:ResetPasswordService, private toast:NgToastService){}
  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password:[null,Validators.required],
      confirmPassword:[null,Validators.required]
    },{
      validator:ConfirmPasswordValidator("password","confirmPassword")
    });
    this.activatedRoute.queryParams.subscribe(val=>{
      this.emailToReset = val['email'];
      let uriToken = val['code'];
      this.emailToken =uriToken.replace(/ /g,'+');
      console.log(this.emailToken);
      console.log(this.emailToReset);
    })
  }
  reset(){
    if(this.resetPasswordForm.valid){
      this.resetPasswordObj.email = this.emailToReset;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.value.password;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.resetPasswordObj.emailToken = this.emailToken;

      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(res)=>{
          this.toast.success({
            detail:'SUCCESS',
            summary:"Password Reseted Successfully",
            duration:3000,
          });
          this.router.navigate(['/'])
        },
        error:(err)=>{
          this.toast.error({
            detail:'ERROR',
            summary:"Something went Wrong !!",
            duration:3000,
          });
        }
      })
    }else{
      this.validateAllFormFields(this.resetPasswordForm);
    }
  }
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
}
