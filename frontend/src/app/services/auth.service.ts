import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { addWorkHoursAction, startOrStopWorkingAction, userLoggedInAction, userLoggedOutAction, userRegisteredAction, usersDownloadedAction } from 'src/app/redux/auth-state';
import store from 'src/app/redux/store';
import { CredentialsModel } from '../models/credentials.model';
import { UserModel } from '../models/user.model';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private notyf: NotifyService) { }

    public async getAllUsers() {
        const users = await this.http.get<UserModel[]>(environment.employeesUrl).toPromise();
        store.dispatch(usersDownloadedAction(users));
        return users;
    }

    public async register(user: UserModel) {
        const addedUser = await this.http.post<UserModel>(environment.employeesUrl, user).toPromise();
        store.dispatch(userRegisteredAction(addedUser));
        return addedUser;
    }

    public async login(credentials: CredentialsModel) {
        const loggedInUser = await this.http.post<UserModel>(environment.loginUrl, credentials).toPromise();
        store.dispatch(userLoggedInAction(loggedInUser));
        return loggedInUser;

    }

    public logout() {
        store.dispatch(userLoggedOutAction());
    }

    public async startOrStopWorking(_id: string, isWorking: boolean) {
        store.dispatch(startOrStopWorkingAction());
        return await this.http.put(environment.isWorkingUrl + _id, { "isWorking": isWorking }).toPromise();
    }

    public async addWorkHoursAndSession(user: UserModel) {
        store.dispatch(addWorkHoursAction(user));
        
        await this.http.put(environment.addWorkHoursUrl + user._id, {
            "totalHours":user.totalHours,
            "totalSessions":user.totalSessions
        }).toPromise();

    }
}
