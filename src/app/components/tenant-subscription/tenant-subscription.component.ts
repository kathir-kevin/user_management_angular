import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { HttpClient } from '@angular/common/http';
import { CountriesService } from 'src/app/services/countries.service';


@Component({
  selector: 'app-tenant-subscription',
  templateUrl: './tenant-subscription.component.html',
  styleUrls: ['./tenant-subscription.component.css']
})
export class TenantSubscriptionComponent implements OnInit{
  public tenants:any=[];
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  public resetPasswordEmail!:string;
  public isValidEmail!:boolean;
  TenantSubscriptionForm!:FormGroup;
  tenantid:any;
  stateInfo: any[] = [];
  stateInfo1: any;
  countryInfo: any[] = [];
  countryInfo1: any;
  cityInfo1:any;
  cityInfo: any[] = [];
  res:[] | undefined;
  constructor(private country:CountriesService,private http: HttpClient,private api:ApiService,private fb:FormBuilder,private auth:AuthService,  private router:Router, private toast:NgToastService, private userStore : UserStoreService,private resetService: ResetPasswordService){}

  ngOnInit(): void {
    this.getCountries();
    // this.tenantid=localStorage.getItem('TenantId');
    // this.api.getTenants().subscribe(res => {
    //   this.tenants = res;
    //   console.log(this.tenants, "Tenant");
    // });
    this.TenantSubscriptionForm = this.fb.group({
      // tenantId:this.tenantid,
      tenantid:"",
      tenantName: ['', Validators.required],
      aBN:['',Validators.required],
      email: ['', Validators.required],
      phoneNo:['',Validators.required],
      srtAddress1: ['', Validators.required],
      srtAddress2: ['', Validators.required],
      city:  this.cityInfo1,
      state: this.stateInfo1,
      postalCode: ['', Validators.required],
      country: this.countryInfo1
    });
  }
  getCountries(){
    this.country.allCountries()
    .subscribe(res=>{
      console.log(res,"res");
        this.countryInfo=res.Countries;
        console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }
 
  onChangeCountry(countryValue: any) {
    this.countryInfo1 = this.countryInfo[countryValue.target.value].CountryName;
    console.log(this.countryInfo1, "country");
    this.stateInfo = this.countryInfo[countryValue.target.value].States;
    console.log(this.stateInfo, "stateinfo");
    this.cityInfo = this.stateInfo[0].Cities;
    console.log(this.cityInfo);
  
    // Update the value in the form control
    this.TenantSubscriptionForm.patchValue({
      country: this.countryInfo1,
      state: '',
      city: ''
    });
  }
  
  onChangeState(stateValue: any) {
    this.stateInfo1 = this.stateInfo[stateValue.target.value].StateName;
    console.log(this.stateInfo1, "state");
    this.cityInfo = this.stateInfo[stateValue.target.value].Cities;
  
    // Update the value in the form control
    this.TenantSubscriptionForm.patchValue({
      state: this.stateInfo1,
      city: ''
    });
  }
  
  onChangeCity(cityValue: any) {
    this.cityInfo1 = this.cityInfo[cityValue.target.value];
    console.log(this.cityInfo1, "city");
  
    // Update the value in the form control
    this.TenantSubscriptionForm.patchValue({
      city: this.cityInfo1
    });
  }
  
    
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSignUp(){
    if(this.TenantSubscriptionForm.valid){

    console.log(this.TenantSubscriptionForm.value)
      //send the data to database
      this.auth.tenantSubscribe(this.TenantSubscriptionForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.TenantSubscriptionForm.reset();
        this.router.navigate(['dashboard'])
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    }else{
      //throw an error using toaster and with required details
    

      this.validateAllFormFields(this.TenantSubscriptionForm);
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

