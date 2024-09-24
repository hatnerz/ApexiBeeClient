import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth.service';
import { SideMenuType, UIPartsControlService } from 'src/app/services/ui-parts.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
    
    userRole!: string;

    constructor(private authService : AuthService, private uiService: UIPartsControlService)
    {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserInfoFromToken().role;
        if(this.userRole.toLowerCase() == "beekeeper") {
            this.uiService.sideMenuType = SideMenuType.User
        }
        else if(this.userRole.toLowerCase() == "manager") {
            this.uiService.sideMenuType = SideMenuType.Manager
        }
        else if(this.userRole.toLowerCase() == "admin") {
            this.uiService.sideMenuType = SideMenuType.Admin
        }
    }

}
