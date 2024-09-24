import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiaryService } from 'src/app/services/api/apiary.service';
import { SensorService } from 'src/app/services/api/sensor.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { Apiary } from 'src/app/shared/models/apiary';
import { Hive } from 'src/app/shared/models/hive';
import { AddSensorModel } from 'src/app/shared/models/sensor';

@Component({
  selector: 'app-apiary-details-page',
  templateUrl: './apiary-details-page.component.html',
  styleUrls: ['./apiary-details-page.component.scss']
})
export class ApiaryDetailsPageComponent implements OnInit {
    dateFormat!: string;
    currentApiary?: Apiary;
    apiaryHives!: Hive[]
    isAddHiveDialogVisible: boolean = false;
    addHiveForm!: FormGroup;
    SERIAL_NUMBER_PATTERN = /^EQ:\d{8}:[\w\d]{8}$/;

    constructor(
        private confirmationService: ConfirmationService,
        private apiaryService: ApiaryService, 
        private router: Router, 
        public localizationService: LocalizationService, 
        private fb: FormBuilder, 
        private sensorService: SensorService,
        private messageService: MessageService ) 
    { }

    ngOnInit(): void {
        this.dateFormat = this.localizationService.getCorrectLocalizedDateFormat();
        this.currentApiary = this.apiaryService.CurrentApiaryDetails;
        if(this.currentApiary == undefined || this.currentApiary == null) {
            this.router.navigate(['/apiary', 'client-list']);
        }

        this.apiaryService.getApiaryHives(this.currentApiary?.id!).subscribe((res) => {
            this.apiaryHives = res;
        })

        this.initAddHiveForm();
    }

    initAddHiveForm() {
        this.addHiveForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            numberOfFrames: [0, Validators.required],
            latitude: [0, [Validators.required, Validators.min(-90), Validators.max(90)]],
            longitude: [0, [Validators.required, Validators.min(-180), Validators.max(180)]],
            apiaryId: ['', Validators.required],
            serialNumber: ['', [Validators.required, Validators.pattern(this.SERIAL_NUMBER_PATTERN)]],
            isStandartSensorsUsed: [true]
          });
    }

    addHive()
    {
        var newHiveData = this.addHiveForm.value;
        const addSensors = newHiveData.isStandartSensorsUsed;
        newHiveData.isStandartSensorsUsed = undefined;
        newHiveData.apiaryId = this.currentApiary?.id;
        this.apiaryService.addHive(newHiveData).subscribe({
            next: (res) => {
                this.messageService.add({severity:'success',summary:'Success',detail:'Hive successfully created'});
                console.log(res);
                var createdHiveId = res.id;
                this.router.navigate(['/apiary', 'hive', createdHiveId]);
                if(addSensors) {
                    this.addStandartSensors(createdHiveId);
                }
            },
            error: (error) => {
                this.messageService.add({severity:'error',summary:"Error",detail:error.error.message})
            }
        })
        console.log(this.addHiveForm.value);
    }

    private addStandartSensors(hiveId: string) {
        this.sensorService.getAllSensorTypes().subscribe((res) => {
            var sensorTypes = res;
            for (const sensorType of sensorTypes) {
                if(sensorType.name == "temperature" || sensorType.name == "humidity" || sensorType.name == "weight") 
                {
                    var addSensorModel: AddSensorModel = {
                        sensorTypeId: sensorType.id,
                        hiveId: hiveId
                    }
                    this.sensorService.addSensor(addSensorModel).subscribe((res) => { this.messageService.add({severity:'success',summary:"Success",detail:`Sensor '${sensorType.name} successfully added to hive'`}) });
                }
            }
        })
    }
    
    onDeleteButtonClicked() {
        this.confirmationService.confirm({
            message: `Are you really want to delete this apiary?`,
            header: "Delete confirmation",
            accept: () => {
                this.deleteCurrentApiary();
            }
        })
    }

    private deleteCurrentApiary() {
        this.apiaryService.deleteApiary(this.currentApiary!.id).subscribe({
            next: () => { this.messageService.add({severity:'success',summary:'Success',detail:'You have successfully deleted apiary'}); this.router.navigate(['/apiary','client-list']); },
            error: () => { this.messageService.add({severity:'error',summary:'Error',detail:'Failed to delete apiary'}); }
        })
    }
}
