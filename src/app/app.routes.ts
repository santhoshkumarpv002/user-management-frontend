import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuardService } from './service/route-guard/route-guard.service';

export const routes: Routes = [
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'dashboard/:email',component:DashboardComponent,canActivate:[RouteGuardService]},
    // {path:'dashboard',component:DashboardComponent},
    {path:'forgot',component:ForgotComponent},
    {path:"",component:LoginComponent},
    {path:"**",component:LoginComponent}
];
