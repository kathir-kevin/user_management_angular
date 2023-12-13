import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserStoreService } from 'src/app/services/user-store.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-tenant-data',
  templateUrl: './manage-tenant-data.component.html',
  styleUrls: ['./manage-tenant-data.component.css']
})
export class ManageTenantDataComponent implements OnInit{

  dtOptions: DataTables.Settings = {};
  public tenants:any=[];
  dtTrigger:Subject<any>=new Subject<any>();
  userName:any;
  role:any;

  constructor(private router: Router,private api: ApiService,private userStore : UserStoreService,private auth:AuthService) {}

  ngOnInit(): void {
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching:true,
      lengthChange:false,
      language:{
        searchPlaceholder:'text tenant'
      }
    };
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
    this.api.getTenants().subscribe(res => {
      this.tenants = res;
      console.log(this.tenants, "Tenant");
      this.dtTrigger.next(null);
      // this.rerender();
    });
  }
  onAccept(tenantData:any){
    this.auth.UpdateTenantStatus(tenantData)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.router.navigate(['manageTenantData'])
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
  }
  Reject(tenantData:any){
    let clickedYes = confirm("Are you sure want to delete");
    if(clickedYes){
     this.auth.DeleteTenant(tenantData.tenantName)
     .subscribe(res=>{
       alert("Deleted Successfully");
       this.router.navigate(['manageTenantData'])
     })
    }
  }
 
}
