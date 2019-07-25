import { AuthService } from './services/auth.service';
import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatCardModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatDividerModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { router } from './router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from './services/categories.service';
import { BillReceivesService } from './services/bill-receives.service';
import { BillPaysService } from './services/bill-pays.service';
import { BillPaysComponent } from './bill-pays/bill-pays.component';
import { BillReceivesComponent } from './bill-receives/bill-receives.component';
import { StatementComponent } from './statement/statement.component';
import { ChartsComponent } from './charts/charts.component';
import { ChartModule } from 'angular-highcharts';

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    CategoriesComponent,
    BillPaysComponent,
    BillReceivesComponent,
    StatementComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDividerModule,
    router,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    ChartModule,
    SnotifyModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    AuthService,
    CategoriesService,
    BillPaysService,
    BillReceivesService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
