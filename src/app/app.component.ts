import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './environments/environment';
import { LocalizationService } from './services/localization.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ApexiBee';
    constructor (private translateService: TranslateService, private localizationService: LocalizationService) {}

    ngOnInit(): void {
        this.translateService.use(this.localizationService.getCurrentLanguage());
    }
}
