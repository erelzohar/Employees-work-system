import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';

@Component({
    selector: 'app-auth-menu',
    templateUrl: './auth-menu.component.html',
    styleUrls: ['./auth-menu.component.css']
})
export class AuthMenuComponent {

    public user: UserModel;
    private unsubscribeMe: Unsubscribe;

    ngOnInit(): void {
        this.unsubscribeMe = store.subscribe(() => {
            this.user = store.getState().user;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
