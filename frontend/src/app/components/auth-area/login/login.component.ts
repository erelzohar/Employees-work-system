import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public credentials = new CredentialsModel();
    public user: UserModel;

    constructor(
        private myAuthService: AuthService,
        private notify: NotifyService,
        private myRouter: Router
    ) { }


    public async login() {
        try {
            if (!this.credentials.phoneNumber || !this.credentials.password)
                throw new Error("Please complete all fields");
            this.user = await this.myAuthService.login(this.credentials);
            this.notify.success("Logged-in");
            this.user.role === "employer" ? this.myRouter.navigateByUrl("/admin-page") : this.myRouter.navigateByUrl("/home-page");  
        }
        catch (err) {
            this.notify.error(err);
        }
    }

}
