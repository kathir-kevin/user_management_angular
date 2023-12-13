import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { CustomerModel, EmployeeModel, InvoiceModel, ProductsModel } from './dashboard.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public role!:string;
  public userName : string = ""; 
  @Input() receive !: string;
  @Input() mobileSpecification !: any;
 
  constructor( private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder, private api:ApiService,private auth:AuthService, private userStore:UserStoreService, private modalService:NgbModal){}
  @ViewChild('content') popupview !: ElementRef;
  pdfurl='';
  username:any;
  ngOnInit(): void {
   
  this.userStore.getUserNameFromStore()
  .subscribe(val=>{
    let UserNameFromToken = this.auth.getUserNameFromToken();
    this.userName = val || UserNameFromToken
  });
  this.userStore.getRoleFromStore()
  .subscribe(val=>{
    let roleFromToken = this.auth.getRoleFromToken();
    this.role = val || roleFromToken;
  })
 

}
  logout(){
    this.auth.signOut();
  }
   
 
  manage_users() {
    this.router.navigate(['manage_users'], { relativeTo: this.route });
  }
  
  ManageTenantData() {
    this.router.navigate(['ManageTenantData'], { relativeTo: this.route });
  }
  report() {
    this.router.navigate(['report'], { relativeTo: this.route });
  }
  add_users(isAddingTenant: boolean) {
    if (isAddingTenant) {
      
      localStorage.setItem('isAddingTenant', 'true');
    } else {
      localStorage.setItem('isAddingTenant', 'false');
    }
    
    this.router.navigate(['UserSignUp'], { relativeTo: this.route });
  }
  job_checklist() {
    this.router.navigate(['check'], { relativeTo: this.route });
  }
  SubscribeTenant() {
    this.router.navigate(['tenantSubscribe'], { relativeTo: this.route });
  }
  job_data() {
    this.router.navigate(['jobData'], { relativeTo: this.route });
  }
  users_workData() {
    this.router.navigate(['usersJobData'], { relativeTo: this.route });
  }
  my_JobDetails() {
    this.router.navigate(['myJobData'], { relativeTo: this.route });
  }
}


