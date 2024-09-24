import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiaryService } from 'src/app/services/api/apiary.service';
import { Apiary } from 'src/app/shared/models/apiary';

@Component({
  selector: 'app-apiary-list',
  templateUrl: './apiary-list.component.html',
  styleUrls: ['./apiary-list.component.scss']
})
export class ApiaryListComponent {

    @Input()
    apiaries!: Apiary[]
    constructor(private router: Router, private apiaryService: ApiaryService) {}

    goApiaryDetails(apiary: Apiary) {
        this.apiaryService.CurrentApiaryDetails = apiary;
        this.router.navigate(["/apiary", "details"])
    }
}
