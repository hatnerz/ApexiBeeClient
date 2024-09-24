import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";

export enum HeaderType {
    None = 0,
    Default = 1
}

export enum SideMenuType {
    None = 0,
    User = 1,
    Admin = 2,
    Manager = 3,
    Cynologist = 4
}

@Injectable({
    providedIn: 'root'
}) 
export class UIPartsControlService {

    headerType: HeaderType = HeaderType.Default;
    sideMenuType: SideMenuType = SideMenuType.None;

    public reset() {
        this.headerType = HeaderType.Default;
    }

    public resetMenu() {
        this.sideMenuType = SideMenuType.None;
    }
}