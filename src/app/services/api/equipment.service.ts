import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EquipmentType } from "src/app/shared/enum/equipment-type";
import { SerialData } from "src/app/shared/models/serialData";

@Injectable({
    providedIn: 'root'
})
export class EquipmentService {

    constructor(
        private http: HttpClient, 
        @Inject ('API_URL') private apiUrl: string,
    ) { }

    generateNewSerialData(equipmentType: EquipmentType) : Observable<SerialData> {
        return this.http.post<SerialData>(`${this.apiUrl}api/Equipment/serial/${equipmentType}`, "")
    }

    getAllSerialData() : Observable<SerialData[]> {
        return this.http.get<SerialData[]>(`${this.apiUrl}api/Equipment/serial/all`)
    }

    deleteSerialData(serialNumber: string) {
        return this.http.delete(`${this.apiUrl}api/Equipment/serial/number/${serialNumber}`);
    }
}