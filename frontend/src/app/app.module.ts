import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtInterceptor } from './services/jwt.interceptor';
import { FormsModule } from '@angular/forms';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { HomePageComponent } from './components/home-area/home-page/home-page.component';
import { AdminPageComponent } from './components/home-area/admin-page/admin-page.component';
import { AddEmployeeComponent } from './components/home-area/add-employee/add-employee.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { TImerComponent } from './components/home-area/timer/timer.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    AuthMenuComponent,
    LoginComponent,
    HomePageComponent,
    AdminPageComponent,
    AddEmployeeComponent,
    LogoutComponent,
    TImerComponent
  ],
  entryComponents:[AddEmployeeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    HttpClientModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: JwtInterceptor, 
    multi: true
}],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
