import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AdminPageComponent } from './components/home-area/admin-page/admin-page.component';
import { HomePageComponent } from './components/home-area/home-page/home-page.component';

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "logout", component: LogoutComponent },
    { path: "home-page", component: HomePageComponent },
    { path: "admin-page", component: AdminPageComponent },
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "**", component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
