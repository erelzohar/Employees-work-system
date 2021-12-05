import { UserModel } from "src/app/models/user.model";

// Auth State: 
export class AuthState {
    public allUsers: UserModel[] = null;
    public user: UserModel = null;
    public constructor() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.user = user;
        }
    }
}

// Auth Action Types: 
export enum AuthActionType {
    UsersDownloaded = "UsersDownloaded",
    UserRegistered = "UserRegistered",
    UserLoggedIn = "UserLoggedIn",
    UserLoggedOut = "UserLoggedOut",
    StartOrStopWorking = "StartOrStopWorking",
    AddWorkHours = "AddWorkHours"
}

// Auth Action: 
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

// Auth Action Creators: 
export function usersDownloadedAction(users: UserModel[]): AuthAction {
    return { type: AuthActionType.UsersDownloaded, payload: users };
}
export function userRegisteredAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserRegistered, payload: user };
}
export function userLoggedInAction(user: UserModel): AuthAction {
    return { type: AuthActionType.UserLoggedIn, payload: user };
}
export function userLoggedOutAction(): AuthAction {
    return { type: AuthActionType.UserLoggedOut };
}
export function startOrStopWorkingAction(): AuthAction {
    return { type: AuthActionType.StartOrStopWorking }
}
export function addWorkHoursAction(user: UserModel): AuthAction {
    return { type: AuthActionType.AddWorkHours, payload: user }
}

// Auth Reducer: 
export function authReducer(currentState: AuthState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.UsersDownloaded:
            newState.allUsers = action.payload;
            break;
        case AuthActionType.UserRegistered:
            newState.allUsers.push(action.payload);
            break;
        case AuthActionType.UserLoggedIn:
            newState.user = action.payload;
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case AuthActionType.AddWorkHours:
            if (newState.user) {
                newState.user.totalSessions = action.payload.totalSessions;
                newState.user.totalHours = action.payload.totalHours;
            }
            break;
        case AuthActionType.UserLoggedOut:
            newState.user = null;
            localStorage.removeItem("user");
            break;
        case AuthActionType.StartOrStopWorking:
            newState.user.isWorking = !currentState.user.isWorking;
            break;


    }

    return newState;
}