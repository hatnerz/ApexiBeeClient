import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/services/api/admin.service';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'app-data-base',
  templateUrl: './data-base.component.html',
  styleUrls: ['./data-base.component.scss']
})
export class DataBaseComponent implements OnInit {

    lastBackupDate: any;
    dateFormat?: string;
    isLoading: boolean = true;
    
    constructor(
        private adminService: AdminService,
        private messageService: MessageService,
        private localizationService: LocalizationService)
    {}

    ngOnInit(): void {
        this.getCorrentDateFormat();
        this.adminService.getLastBackupDate().subscribe({
            next: (response) => {
                this.lastBackupDate = response;
                this.isLoading = false;
            }
        })    
    }

    restoreDatabase() {
        this.adminService.restoreDatabaseFromBackup().subscribe({
            next: (response) => {
                this.messageService.add({
                    severity:'success',summary:'Success',detail:'Database successfully restored'
                })
            }
        })
    }
    
    createBackup() {
        this.adminService.createBackup().subscribe({
            next: (response) => {
                this.messageService.add({
                    severity:'success',summary:'Success',detail:'Backup sucessfully created'
                });
                this.adminService.getLastBackupDate().subscribe({
                    next: (response) => this.lastBackupDate = response
                })
            }
        })
    }

    getCorrentDateFormat() {
        this.dateFormat = 
            this.localizationService.getCurrentTimeFormat()?.format + " "
            + this.localizationService.getCurrentDataFormat()?.value;
    }

    getCorrectDate(date: any) {
        var newDate = new Date(date);
        console.log(newDate);
        console.log(this.dateFormat);
        //newDate.setHours(newDate.getHours() + this.localizationService.getCurrentTimeZone());
        return newDate;
    }
}
