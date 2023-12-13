import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  public tenants:any=[];
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;
  isAddingTenant:any;
  SignUpFormUser!:FormGroup;
  tenantid:any;
  usrTenantId: any;
  tenantName: any;
  constructor(private route: ActivatedRoute, private api:ApiService,private fb:FormBuilder,private auth:AuthService,  private router:Router, private toast:NgToastService, private userStore : UserStoreService,private resetService: ResetPasswordService){}

  ngOnInit(): void {
    this.tenantid=localStorage.getItem('TenantId');
    this.isAddingTenant = localStorage.getItem('isAddingTenant');
    console.log(this.isAddingTenant);
    this.usrTenantId = localStorage.getItem('TenantId') ;
    this.tenantName = localStorage.getItem('TenantName') ;
      
    this.api.getTenants().subscribe(res => {
      this.tenants = res;
      console.log(this.tenants, "Tenant");
      // this.dtTrigger.next(null);
      // this.rerender();
    });
    if (this.isAddingTenant === 'false') {
      this.SignUpFormUser = this.fb.group({
        usrTenantId: [this.usrTenantId, Validators.required],
        usrId: ['', Validators.required],
        tenantName: [this.tenantName, Validators.required],
        usrFullName: ['', Validators.required],
        usrEmail: ['', Validators.required],
        usrPhoneNo: ['', Validators.required],
        usrPassword: ['', Validators.required],
        usrJobRole: ['', Validators.required],
        ratePerHour: ['', Validators.required],
        isUsrActive: [false, Validators.required]
      });
    } else {
      this.SignUpFormUser = this.fb.group({
        usrTenantId: ['', Validators.required],
        usrId: ['', Validators.required],
        tenantName: ['', Validators.required],
        usrFullName: ['', Validators.required],
        usrEmail: ['', Validators.required],
        usrPhoneNo: ['', Validators.required],
        usrPassword: ['', Validators.required],
        isUsrActive: [false, Validators.required]
      });
    }

  }
  getSelectedValue(event: any) {
    this.SignUpFormUser.controls['role'].setValue(event.target.value);
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSignUp(){
    if(this.SignUpFormUser.valid){

    console.log(this.SignUpFormUser.value)
      //send the data to database
      this.auth.signup(this.SignUpFormUser.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.SignUpFormUser.reset();
          this.router.navigate(['dashboard'])
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }else{
      //throw an error using toaster and with required details
    

      this.validateAllFormFields(this.SignUpFormUser);
      alert("your form is invalid");
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
  
checkValidEmail(event:string){
  const value = event;
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  this.isValidEmail = pattern.test(value);
  return this.isValidEmail;
}

}
