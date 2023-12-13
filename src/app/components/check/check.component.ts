import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit{
  //labelObj : LabelModel = new LabelModel();
  labeldata: any;
  tenantId:any;
  Input1:any=false;Input2:any=false;Input3:any=false;Input4:any=false;Input5:any=false;Input6:any=false;Input7:any=false;
  Input8:any=false;Input9:any=false;Input10:any=false;
  l1:any; l2:any; l3:any; l4:any; l5:any; l6:any; l7:any; l8:any; l9:any; l10:any; 
   //formValue5!:FormGroup;
  constructor( private router:Router,private http: HttpClient,private formBuilder: FormBuilder,private auth:AuthService) {}
    ngOnInit() {
      // localStorage.setItem('TenantId', this.loginFormAdmin.value.tenantId);
    this.tenantId=localStorage.getItem('TenantId');
      
      this.formValue5.setValue ({
        TenantId:this.tenantId,
        Label1: "",
        Label2: "",
        Label3: "",
        Label4: "",
        Label5: "",
        Label6: "",
        Label7: "",
        Label8: "",
        Label9: "",
        Label10: "",
        Input1:this.Input1,
        Input2:this.Input2,
        Input3:this.Input3,
        Input4:this.Input4,
        Input5:this.Input5,
        Input6:this.Input6,
        Input7:this.Input7,
        Input8:this.Input8,
        Input9:this.Input9,
        Input10:this.Input10
      });
    
  }
  formValue5 = new FormGroup(
    {
      TenantId: new FormControl(''),
      Label1: new FormControl(''),
      Label2: new FormControl(''),
      Label3: new FormControl(''),
      Label4: new FormControl(''),
      Label5: new FormControl(''),
      Label6: new FormControl(''),
      Label7: new FormControl(''),
      Label8: new FormControl(''),
      Label9: new FormControl(''),
      Label10: new FormControl(''),
      Input1:new FormControl(false),
      Input2:new FormControl(false),
      Input3:new FormControl(false),
      Input4:new FormControl(false),
      Input5:new FormControl(false),
      Input6:new FormControl(false),
      Input7:new FormControl(false),
      Input8:new FormControl(false),
      Input9:new FormControl(false),
      Input10:new FormControl(false)
   
    },
   
  );
  getLabelDeta(){
    
    // this.http.get('http://localhost:5148/api/Editable/get_all_fieldValues').subscribe((response: any) => {
    //   this.label = response;
    //   console.log(this.label );
    // });
  }

  postInvoiceDetails() {
     console.log(this.formValue5.value);
    this.auth.PostLabel(this.formValue5.value)
     .subscribe(res => {
       alert(res.message);
          this.formValue5.reset();
          this.router.navigate(['dashboard'])
          this.getLabelDeta();
     })
  }
 
onChange(checked:any) {
switch (checked) {
  case 1:
    this.Input1= true;
    break;
  case 2:
    this.Input2= true;
    break;
  case 3:
    this.Input3= true;
    break;
  case 4:
    this.Input4= true;
    break;
  case 5:
      this.Input5= true;
      break;
  case 6:
    this.Input6= true;
    break;
  case 7:
    this.Input7= true;
    break;
  case 8:
    this.Input8= true;
    break;
  case 9:
    this.Input9= true;
    break;
  case 10:
    this.Input10= true;
    break;
  // default:
  //   text = "No value found";
}
}
// if(checked === 1 ) {
  //      this.Input1= true;
  //      console.log(this.Input1);
  // }
}
