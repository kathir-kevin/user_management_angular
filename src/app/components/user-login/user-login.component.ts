import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;
  loginFormUser!:FormGroup
  userName:any;
  role:any;
  userId:any;
  TenantData:any;
  TenantId:any;
  TenantName:any;
  constructor(private fb:FormBuilder,private auth:AuthService,  private router:Router, private toast:NgToastService, private userStore : UserStoreService,private resetService: ResetPasswordService){}

  ngOnInit(): void {
    this.loginFormUser = this.fb.group({
      usrId: ['', Validators.required],
      usrPassword: ['', Validators.required]
    });
    this.userStore.getUserNameFromStore()
    .subscribe(val=>{
      let UserNameFromToken = this.auth.getUserNameFromToken();
      this.userName = val || UserNameFromToken
      console.log(this.userName,"usrname")
    });
    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
      console.log(this.role);
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
 
  onLogin(){
    if(this.loginFormUser.valid){

    console.log(this.loginFormUser.value)
    localStorage.setItem('UserId', this.loginFormUser.value.usrId);
      //send the data to database
      this.auth.Userlogin(this.loginFormUser.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.loginFormUser.reset();
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setUserNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.getTenantDataByUserId();
          this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000})
          this.router.navigate(['dashboard']);
        }),
        error:(err)=>{
          this.toast.error({detail:"ERROR", summary:"Something went wrong!", duration:5000});
          console.log(err);
        },
      })
    }else{
      //throw an error using toaster and with required details
    

      this.validateAllFormFields(this.loginFormUser);
      alert("your form is invalid");
    }
  }
  getTenantDataByUserId() {
    this.userId=localStorage.getItem('UserId');
    console.log(this.userId);
    var Res: any[] = [];
    this.auth.GetTenantDataByUserId(this.userId)
    .subscribe(res=>{
     // console.log(res,"sadaa");
      //Res.push(res.TenantDataByUserId)
      this.TenantData =  res.tenantDataByUserId;
      console.log(this.TenantData);
      this.TenantId=this.TenantData.usrTenantId;
      localStorage.setItem('TenantId', this.TenantId);
      this.TenantName=this.TenantData.tenantName;
      localStorage.setItem('TenantName', this.TenantName);
      console.log(this.TenantId,"tenantId");
    })
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
checkValidEmail(event:string){
  const value = event;
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  this.isValidEmail = pattern.test(value);
  return this.isValidEmail;
}
confirmToSend(){
  if(this.checkValidEmail(this.resetPasswordEmail)){
    console.log(this.resetPasswordEmail);

    this.resetService.sendResetPassWordLink(this.resetPasswordEmail)
    .subscribe({
      next:(res)=>{
        this.toast.success({
          detail:'SUCCESS',
          summary:'Email sent Successfull!',
          duration:3000,
        });
        this.resetPasswordEmail="";
        const buttonRef = document.getElementById("closeBtn");
        buttonRef?.click();
      },
      error:(err)=>{
        this.toast.error({
          detail:'ERROR',
          summary:'something went wrong!',
          duration:3000,
        });
      }
      
    })
   
     //API call need to be done
  }
}
}
