import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private myNotyf: NotifyService,
        private myAuthService: AuthService) { }

    public newEmployee: UserModel = new UserModel();
    public passConfirm: string;

    public async add() {
        try {
            if (this.passConfirm !== this.newEmployee.password)
                return this.myNotyf.error("Passwords do not match.");
            this.newEmployee.isWorking = false;
            this.newEmployee.role = "employee";
            this.newEmployee.totalHours = 0;
            this.newEmployee.totalSessions = 0;
            await this.myAuthService.register(this.newEmployee);
            this.myNotyf.success("Added !")
        }
        catch (err) {
            this.myNotyf.error(err.message);
        }
    }
}
