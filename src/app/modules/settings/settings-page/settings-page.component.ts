import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
    
    languageSetting: any;
    dataFormatSetting: any;
    timeZone: any;
    timeFormat: any;

    constructor(public localizationService: LocalizationService, private messageService: MessageService)
    {
        this.languageSetting = localizationService.getCurrentLanguage();
        this.dataFormatSetting = localizationService.getCurrentDataFormat();
        this.timeZone = localizationService.getCurrentTimeZone();
        this.timeFormat = localizationService.getCurrentTimeFormat();
    }

    applyChanges() {
        this.localizationService.setLanguage(this.languageSetting);
        this.localizationService.setCurrentDataFormat(this.dataFormatSetting.lang);
        this.localizationService.setCurrentTimeZone(this.timeZone);
        this.localizationService.setCurrentTimeFormat(this.timeFormat.value);
        this.messageService.add({severity:'success', summary:'Success', detail:'Settings successfully applied'})
    }
}
