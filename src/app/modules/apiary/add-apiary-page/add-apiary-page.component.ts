import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiaryService } from 'src/app/services/api/apiary.service';
import { AuthService } from 'src/app/services/api/auth.service';
import { CRITICAL_HUMIDITY_HIGH, CRITICAL_HUMIDITY_LOW, CRITICAL_TEMP_HIGH, CRITICAL_TEMP_LOW } from 'src/app/shared/values/apiaryCriticalValues';

@Component({
  selector: 'app-add-apiary-page',
  templateUrl: './add-apiary-page.component.html',
  styleUrls: ['./add-apiary-page.component.scss']
})
export class AddApiaryPageComponent implements OnInit {
    addApiaryForm!: FormGroup;
    isStandartValueUsed: FormControl = new FormControl(true);
    SERIAL_NUMBER_PATTERN = /^EQ:\d{8}:[\w\d]{8}$/;
    constructor(private authService: AuthService, private fb: FormBuilder, private messageService: MessageService, private apiaryService: ApiaryService, private router: Router)
    { }

    ngOnInit(): void {
        this.initAddApiaryForm();
    }

    addApiary() {
        var currentBeekeeperId = this.authService.getUserInfoFromToken().accountId;
        this.addApiaryForm.get('apiaryData')?.get('beekeeperUserId')?.setValue(currentBeekeeperId);
        this.enableCriticalFields();
        if(!this.addApiaryForm.valid) {
            this.messageService.add({severity:'error',summary:"Error",detail:"You need to fill all fields correctly"})
            return;
        }
        var sendValue = { ...this.addApiaryForm.value, isStandartValueUsed: undefined }
        console.log(sendValue);
        if(this.isStandartValueUsed.value) {
            this.disableCriticalFields();
        }
        this.apiaryService.addApiary(sendValue).subscribe({
            next: (res) => {
                this.messageService.add({severity:'success',summary:'Success',detail:'Apiary successfully added'});
                this.router.navigate(['/apiary', 'client-list'])
            },
            error: (error) => {
                this.messageService.add({severity:'error',summary:'Error',detail:error.error.message});
            }

        })
    }

    initAddApiaryForm() {
        this.addApiaryForm = this.fb.group({
            apiaryData: this.fb.group({
              name: ['', Validators.required],
              description: ['', Validators.required],
              beekeeperUserId: ['', [Validators.required, Validators.pattern('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')]]
            }),
            hubData: this.fb.group({
              latitude: [0, [Validators.required, Validators.min(-90), Validators.max(90)]],
              longitude: [0, [Validators.required, Validators.min(-180), Validators.max(180)]],
              serialNumber: ['', [Validators.required, Validators.pattern(this.SERIAL_NUMBER_PATTERN)]],
              criticalHumidityHigh: [{ value: CRITICAL_HUMIDITY_HIGH, disabled: true }, Validators.required],
              criticalHumidityLow: [{ value: CRITICAL_HUMIDITY_LOW, disabled: true }, Validators.required ],
              criticalTemperatureHigh: [{ value: CRITICAL_TEMP_HIGH, disabled: true }, Validators.required],
              criticalTemperatureLow: [{ value: CRITICAL_TEMP_LOW, disabled: true }, Validators.required],
            }),
            isStandartValueUsed: this.isStandartValueUsed
        });
    }

    enableCriticalFields() {
        this.addApiaryForm.get('hubData')!.get('criticalHumidityHigh')!.enable();
        this.addApiaryForm.get('hubData')!.get('criticalHumidityLow')!.enable();
        this.addApiaryForm.get('hubData')!.get('criticalTemperatureHigh')!.enable();
        this.addApiaryForm.get('hubData')!.get('criticalTemperatureLow')!.enable();
    }

    disableCriticalFields() {
        this.addApiaryForm.get('hubData')!.get('criticalHumidityHigh')!.disable();
        this.addApiaryForm.get('hubData')!.get('criticalHumidityLow')!.disable();
        this.addApiaryForm.get('hubData')!.get('criticalTemperatureHigh')!.disable();
        this.addApiaryForm.get('hubData')!.get('criticalTemperatureLow')!.disable();
    }

    setCriticalFields() {

        this.addApiaryForm.get('hubData')!.get('criticalHumidityHigh')!.setValue(CRITICAL_HUMIDITY_HIGH);
        this.addApiaryForm.get('hubData')!.get('criticalHumidityLow')!.setValue(CRITICAL_HUMIDITY_LOW);
        this.addApiaryForm.get('hubData')!.get('criticalTemperatureHigh')!.setValue(CRITICAL_TEMP_HIGH);
        this.addApiaryForm.get('hubData')!.get('criticalTemperatureLow')!.setValue(CRITICAL_TEMP_LOW);
    }

    onCheckboxChange(event: any) {
        console.log(this.isStandartValueUsed.value);
        if(this.isStandartValueUsed.value == false) {
            this.enableCriticalFields();
        }
        else {
            this.disableCriticalFields();
            this.setCriticalFields();
        }
    }
}
