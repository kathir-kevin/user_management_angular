import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetComponent } from './components/reset/reset.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ManageUsersComponent } from './components/manage_users/manage_users.component';
import {MatSidenavModule} from '@angular/material/sidenav'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReportComponent } from './components/report/report.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { CardComponent } from './components/card/card.component';
import { PieComponent } from './components/pie/pie.component';
import { ManageTenantDataComponent } from './components/manage-tenant-data/manage-tenant-data.component';
import { DataTablesModule } from 'angular-datatables';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { CheckComponent } from './components/check/check.component';
import { TenantSubscriptionComponent } from './components/tenant-subscription/tenant-subscription.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { JobDataComponent } from './components/job-data/job-data.component';
import { UsersJobDataComponent } from './components/users-job-data/users-job-data.component';
import { UserJobDataComponent } from './components/user-job-data/user-job-data.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ResetComponent,
    ManageUsersComponent,  
    ReportComponent,
    CardComponent,
    PieComponent,
    ManageTenantDataComponent,
    AddUserComponent,
    UserLoginComponent,
    CheckComponent,
    TenantSubscriptionComponent,
    JobDataComponent,
    UsersJobDataComponent,
    UserJobDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AgGridModule,
    MatDialogModule,
    ImageCropperModule,
    //ChartModule,
    HighchartsChartModule,
    FlexLayoutModule,
    MatCardModule,
    MatDividerModule,
    DataTablesModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
