import { Component, OnInit } from '@angular/core';
import { SideMenuType, UIPartsControlService } from 'src/app/services/ui-parts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    constructor(private uiService: UIPartsControlService)
    {}

    ngOnInit(): void {
        this.uiService.sideMenuType = SideMenuType.None;
    }
}
