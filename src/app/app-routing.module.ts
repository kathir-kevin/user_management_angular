import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResetComponent } from './components/reset/reset.component';
import { AuthGuard } from './guard/auth.guard';
import { ManageUsersComponent } from './components/manage_users/manage_users.component';
import { ReportComponent } from './components/report/report.component';
import { CardComponent } from './components/card/card.component';
import { ManageTenantDataComponent } from './components/manage-tenant-data/manage-tenant-data.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CheckComponent } from './components/check/check.component';
import { TenantSubscriptionComponent } from './components/tenant-subscription/tenant-subscription.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { JobDataComponent } from './components/job-data/job-data.component';
import { UsersJobDataComponent } from './components/users-job-data/users-job-data.component';
import { UserJobDataComponent } from './components/user-job-data/user-job-data.component';
const routes: Routes = [
  {path:'',redirectTo:'usrLogin',pathMatch:'full'},
  {path:'usrLogin',component:UserLoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'reset',component:ResetComponent},
  {path:'card',component:CardComponent},
  {path:'UserSignUp',component:AddUserComponent},
  {path:'check',component:CheckComponent},
  {path:'tenantSubscribe',component:TenantSubscriptionComponent},
  {path:'jobData',component:JobDataComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
     
      {
        path: 'manage_users',
        component: ManageUsersComponent,
      },
     
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path:'ManageTenantData',
        component:ManageTenantDataComponent
      },
      {
        path:'UserSignUp',
        component:AddUserComponent
      },
      {
        path:'check',component:CheckComponent
      },
      {
        path:'tenantSubscribe',component:TenantSubscriptionComponent
      },
      {
        path:'jobData',component:JobDataComponent
      },
      {
        path:'usersJobData',component:UsersJobDataComponent
      },
      {
        path:'myJobData',component:UserJobDataComponent
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
