import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ConfirmationService, MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { ApiaryService } from 'src/app/services/api/apiary.service';
import { AuthService } from 'src/app/services/api/auth.service';
import { SensorService } from 'src/app/services/api/sensor.service';
import { ConverterService } from 'src/app/services/converter.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { Hive } from 'src/app/shared/models/hive';
import { Sensor, SensorReading } from 'src/app/shared/models/sensor';

@Component({
  providers: [DatePipe],
  selector: 'app-hive-details-page',
  templateUrl: './hive-details-page.component.html',
  styleUrls: ['./hive-details-page.component.scss']
})
export class HiveDetailsPageComponent implements OnInit {
    currentHive!: Hive
    hiveSensors!: Sensor[]
    dateFormat!: string;
    lastReadings: SensorReading[] = []

    @ViewChildren('chart1', { read: Chart }) chart1!: QueryList<Chart>;
    @ViewChildren('chart2', { read: Chart }) chart2!: QueryList<Chart>;
    @ViewChildren('chart3', { read: Chart }) chart3!: QueryList<Chart>;
    @ViewChildren('chart4', { read: Chart }) chart4!: QueryList<Chart>;

    // chart
    data: any = [];
    options: any;

    temperatureUnits = "°C";
    weightUnits = "kg";

    constructor(
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private converterService: ConverterService,
        public localizationService: LocalizationService, 
        private route: ActivatedRoute, 
        private datePipe: DatePipe,
        private authService : AuthService, 
        private sensorService: SensorService, 
        private apiaryService: ApiaryService) {
    }

    ngOnInit(): void {
        this.dateFormat = this.localizationService.getCorrectLocalizedDateFormat();
        this.route.params.subscribe(params => {
            const hiveId = params['id'];
            this.apiaryService.getHiveById(hiveId).subscribe((res) => {
                this.currentHive = res;
            })
            this.sensorService.getAllHiveSensors(hiveId).subscribe((res) => {
                this.hiveSensors = res;

                const observables = this.hiveSensors.map(sensor =>
                    this.sensorService.getSensorWithType(sensor.id)
                  );
                  
                  forkJoin(observables).subscribe(responses => {
                    for (let i = 0; i < this.hiveSensors.length; i++) {
                      const sensor = this.hiveSensors[i];
                      sensor.sensorType = responses[i].sensorType;
                    }

                    this.fillSensorData();
                  });

            })
            
            this.sensorService.getLastHiveSensorReadings(hiveId).subscribe((res) => {
                this.lastReadings = res;
            })
        })

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.9,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

    }

    getSensorLastReading(sensorId: string) {
        for (let reading of this.lastReadings) {
            if(reading.sensorId == sensorId) {
                return reading;
            }
        }

        return null;
    }

    getReadingDate(sensorReading : SensorReading | null) {
        return sensorReading?.readingDate;
    }

    getLocalizedValue(sensorType: string, value: number) {
        return value; 
    }

    getCorrectActualLocalizedUnits(sensor: Sensor) {
        if(sensor.sensorType?.name == "temperature") {
            return this.temperatureUnits;
        }

        if(sensor.sensorType?.name == "weight") {
            return this.weightUnits;
        }

        else {
            return sensor.sensorType?.measureUnit;
        }
    }

    // chart visualizing
    calculateVisualizingData(sensorReadings: SensorReading[], isTemp: boolean, isWeight: boolean) {
        const documentStyle = getComputedStyle(document.documentElement);

        for (let reading of sensorReadings) {
            console.log(reading.readingDate);
            reading.readingDate = new Date(reading.readingDate);
        }

        console.log(sensorReadings);

        sensorReadings = sensorReadings.sort((a, b) => a.readingDate.getTime() - b.readingDate.getTime());

        let chartData: number[] = []
        let chartLabels: any[] = []

        sensorReadings.forEach(item => {
            chartLabels.push(this.transformDate(item.readingDate));
            var chartValue = item.value;
            if(isTemp) {
                if(this.temperatureUnits == "°F") {
                    chartValue = this.converterService.celsiusToFahrenheit(item.value);
                }
            }

            if(isWeight) {
                if(this.weightUnits == "lb") {
                    chartValue = this.converterService.kilogramsToPounds(item.value);
                }
            }

            chartData.push(chartValue);
        });

        let data = {
            labels: chartLabels,
            datasets: [
                {
                    label: 'Sensor reading',
                    data: chartData,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
            ]
        };
        
        console.log(data);

        return data;
    }

    transformDate(date: Date) {
        var correctDate = this.localizationService.getCorrectLocalizedDate(date);
        var timeFormat = this.localizationService.getCurrentTimeFormat()?.format;
        var dateFormat = this.localizationService.getCurrentDataFormat()?.value;
        console.log(timeFormat, dateFormat);
        return this.datePipe.transform(correctDate, timeFormat + " " + dateFormat);
    }

    fillSensorData() {
        var currentMoment = new Date();
        var twentyFourHoursAgo  = new Date(currentMoment.getTime() - (24 * 60 * 60 * 1000));
        for (let i = 0; i < this.hiveSensors.length; i++) {
            let sensor = this.hiveSensors[i];
            let currentIndex = i;
            this.sensorService.getSensorReadingDuringPeriod(sensor.id, twentyFourHoursAgo, currentMoment).subscribe((res) => {
                var sensorData = res;
                if(sensor.sensorType?.name == "temperature") {
                    var calculatedChartData = this.calculateVisualizingData(sensorData, true, false);
                    this.data[currentIndex] = calculatedChartData;
                }
                else if(sensor.sensorType?.name == "weight") {
                    var calculatedChartData = this.calculateVisualizingData(sensorData, false, true);
                    this.data[currentIndex] = calculatedChartData;
                }
                else {
                    var calculatedChartData = this.calculateVisualizingData(sensorData, false, false);
                    this.data[currentIndex] = calculatedChartData;
                }

            })
        }
    }

    onUnitChanged() {
        this.fillSensorData();
    }

    getCorrectSensorValue(sensorValue: number, sensorType: string) {
        if(sensorType == "temperature") {
            if(this.temperatureUnits == "°F") {
                return this.converterService.celsiusToFahrenheit(sensorValue);
            }
        }

        if(sensorType == "weight") {
            if(this.weightUnits == "lb") {
                return this.converterService.kilogramsToPounds(sensorValue);
            }
        }

        return sensorValue;
    }

    activateHive() {
        this.apiaryService.checkHive(this.currentHive.id).subscribe(() => {
            this.apiaryService.getHiveById(this.currentHive.id).subscribe((res) => {
                this.currentHive = res;
            })
        });
    }

    onDeleteButtonClicked() {
        this.confirmationService.confirm({
            message: `Are you really want to delete this hive with all sensors?`,
            header: "Delete confirmation",
            accept: () => {
                this.deleteCurrentHive();
            }
        })
    }

    private deleteCurrentHive() {
        this.apiaryService.deleteHive(this.currentHive.id).subscribe({
            next: () => { this.messageService.add({severity:'success',summary:'Success',detail:'You have successfully deleted hive'}); this.router.navigate(['/apiary','details']); },
            error: () => { this.messageService.add({severity:'error',summary:'Error',detail:'Failed to delete hive'}); }
        })
    }
}
