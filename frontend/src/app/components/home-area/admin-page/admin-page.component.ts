import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnDestroy {

    constructor(private myAuthService: AuthService , private myDialog : MatDialog) { }

    public unsubscribe: Unsubscribe;
    public employees: UserModel[];

    async ngOnInit() {

        this.employees = await this.myAuthService.getAllUsers();
        this.unsubscribe = store.subscribe(() => {
            this.employees = store.getState().allUsers;
        });
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    public openDialog(){
        let dialogRef = this.myDialog.open(AddEmployeeComponent);
    }

}
