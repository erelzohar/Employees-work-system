import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import { startOrStopWorkingAction } from 'src/app/redux/auth-state';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    constructor(private myHttp : HttpClient) { }
    public unsubscribe : Unsubscribe;
    public user: UserModel;
    public workTime: { hours: 0, minutes: 0, seconds: 0 };

    ngOnInit(): void {
        this.user = store.getState().user;

    }

    public startOrStopWorking(){
        store.dispatch(startOrStopWorkingAction());
        // this.myHttp.post
    }

}
