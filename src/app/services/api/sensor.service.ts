import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddSensorModel, Sensor, SensorReading, SensorType } from "src/app/shared/models/sensor";

@Injectable({
    providedIn: 'root'
})
export class SensorService {

    constructor(
        private http: HttpClient,
        @Inject ('API_URL') private apiUrl: string,
    ) { }

    addSensor(model: AddSensorModel) : Observable<Sensor> {
        return this.http.post<Sensor>(`${this.apiUrl}api/Sensor`, model);
    }
    
    getAllSensorTypes() : Observable<SensorType[]> {
        return this.http.get<SensorType[]>(`${this.apiUrl}api/Sensor/type/all`);
    }
    
    getAllHiveSensors(hiveId: string) : Observable<Sensor[]> {
        return this.http.get<Sensor[]>(`${this.apiUrl}api/Sensor/hive/${hiveId}`);
    }

    getSensorWithType(sensorId: string) : Observable<Sensor> {
        return this.http.get<Sensor>(`${this.apiUrl}api/Sensor/${sensorId}`);
    }

    getLastHiveSensorReadings(hiveId: string) : Observable<SensorReading[]> {
        return this.http.get<SensorReading[]>(`${this.apiUrl}api/Sensor/hive/${hiveId}/last`);
    }

    getSensorReadingDuringPeriod(sensorId: string, startDate: Date, endDate: Date) : Observable<SensorReading[]>
    {
        let params = new HttpParams();
        params = params.append('sensorId', sensorId);
        params = params.append('startDate', startDate.toISOString());
        params = params.append('endDate', endDate.toISOString());
        return this.http.get<SensorReading[]>(`${this.apiUrl}api/Sensor/period`, {params: params});
    }
}
