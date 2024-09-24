import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Apiary } from "src/app/shared/models/apiary";
import { Hive } from "src/app/shared/models/hive";

@Injectable({
    providedIn: 'root'
})
export class ApiaryService {

    private _currentApiaryDetails?: Apiary;

    set CurrentApiaryDetails(apiary: Apiary | undefined) {
        this._currentApiaryDetails = apiary;
    }

    get CurrentApiaryDetails() : Apiary | undefined {
        return this._currentApiaryDetails;
    }

    constructor(
        private http: HttpClient,
        @Inject ('API_URL') private apiUrl: string,
    ) { }

    addApiary(apiaryData: any) : Observable<any> {
        return this.http.post(`${this.apiUrl}api/Apiary`, apiaryData);
    }

    getUserApiaries(userId: string) : Observable<Apiary[]> {
        return this.http.get<Apiary[]>(`${this.apiUrl}api/Apiary/user/${userId}`);
    }

    getApiaryHives(apiaryId: string) : Observable<Hive[]> {
        return this.http.get<Hive[]>(`${this.apiUrl}api/Apiary/hives/${apiaryId}`)
    }

    addHive(hiveData: any) : Observable<Hive> {
        return this.http.post<Hive>(`${this.apiUrl}api/Apiary/hive`, hiveData);
    }

    getHiveById(id: string) : Observable<Hive> {
        return this.http.get<Hive>(`${this.apiUrl}api/hive/${id}`);
    }

    checkHive(hiveId: string) {
        return this.http.patch(`${this.apiUrl}api/Apiary/hive/${hiveId}`, '')
    }

    deleteHive(hiveId: string) {
        return this.http.delete(`${this.apiUrl}api/Apiary/hive/${hiveId}`);
    }
    
    deleteApiary(apiaryId: string) {
        return this.http.delete(`${this.apiUrl}api/Apiary/${apiaryId}`);
    }
}
