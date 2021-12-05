import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css']
})
export class TImerComponent implements OnInit, OnDestroy {

    constructor(private myAuthService: AuthService, private myNotyf: NotifyService) {
        this.startListening();
     }

    public unsubscribe: Unsubscribe;
    public user = store.getState().user;
    public time: number = 0;
    public display: string;
    public interval: any;
    public updatedUser: UserModel = new UserModel();

    ngOnInit() {
        this.updatedUser.totalHours = this.user.totalHours;
        this.updatedUser.totalSessions = this.user.totalSessions;
        this.updatedUser._id = this.user._id;
        this.unsubscribe = store.subscribe(() => {
            this.user = store.getState().user;
        });
    }

    async ngOnDestroy() {
        try {
            await this.myAuthService.startOrStopWorking(this.updatedUser._id, true);
            this.unsubscribe();
            await this.addWorkHours();
            this.stopListening();
        }
        catch (err) {
            this.myNotyf.error(err.message);
        }
    }

    public async startTimer() {
        await this.myAuthService.startOrStopWorking(this.user._id, this.user.isWorking);
        let today = new Date().getDate();
        console.log(today)

        this.interval = setInterval(async () => {
            if (new Date().getDate() !== today) {
                today = new Date().getDate();
                await this.addWorkHours();
                this.myNotyf.success("Its a new day!");
                this.time = 0;
                console.log(today)
            }
            if (this.time === 0) {
                this.time++;
            } else {
                this.time++;
            }
            this.display = this.transform(this.time)
        }, 1000);
    }
    public transform(value: number): string {
        var sec_num = value;
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        return hours + ':' + minutes + ':' + seconds;
    }
    public pauseTimer() {
        this.myAuthService.startOrStopWorking(this.user._id, this.user.isWorking);
        clearInterval(this.interval);
    }

    public async addWorkHours() {
        this.updatedUser.totalHours += this.time / 3600;
        this.updatedUser.totalSessions += 1;
        await this.myAuthService.addWorkHoursAndSession(this.updatedUser);
    }

    private startListening(){
        window.addEventListener("beforeunload",this.ngOnDestroy.bind(this))
    }
    private stopListening(){
        window.removeEventListener("beforeunload",this.ngOnDestroy.bind(this))
    }
}
