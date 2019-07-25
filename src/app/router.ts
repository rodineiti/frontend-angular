import { ChartsComponent } from './charts/charts.component';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StatementComponent } from './statement/statement.component';
import { BillPaysComponent } from './bill-pays/bill-pays.component';
import { BillReceivesComponent } from './bill-receives/bill-receives.component';
import { CategoriesComponent } from './categories/categories.component';

import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
    { path: 'bill_pays', component: BillPaysComponent, canActivate: [AuthGuard] },
    { path: 'bill_receives', component: BillReceivesComponent, canActivate: [AuthGuard] },
    { path: 'statements', component: StatementComponent, canActivate: [AuthGuard] },
    { path: 'charts', component: ChartsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path : '', redirectTo:'/login', pathMatch : 'full'}
];

export const router = RouterModule.forRoot(appRoutes);