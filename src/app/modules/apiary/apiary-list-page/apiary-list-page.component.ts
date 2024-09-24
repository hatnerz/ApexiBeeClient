import { Component, OnInit } from '@angular/core';
import { ApiaryService } from 'src/app/services/api/apiary.service';
import { AuthService } from 'src/app/services/api/auth.service';
import { Apiary } from 'src/app/shared/models/apiary';

@Component({
  selector: 'app-apiary-list-page',
  templateUrl: './apiary-list-page.component.html',
  styleUrls: ['./apiary-list-page.component.scss']
})
export class ApiaryListPageComponent implements OnInit {

    currentUserApiaries!: Apiary[]

    constructor(private authService: AuthService, private apiaryService: ApiaryService)
    { }

    ngOnInit(): void {
        var userAccountId = this.authService.getUserInfoFromToken().accountId;
        this.apiaryService.getUserApiaries(userAccountId).subscribe((res) => {
            this.currentUserApiaries = res;
        })
    }
}
