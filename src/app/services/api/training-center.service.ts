import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adress, TrainingCenter } from 'src/app/shared/models/training-center';

@Injectable({
  providedIn: 'root'
})
export class TrainingCenterService {

    constructor(
        private http: HttpClient, 
        @Inject('API_URL') private apiUrl: string
    ) {}

    getAllTrainingCenters() : Observable<any> {
        return this.http.get(`${this.apiUrl}api/TrainingCenter`);
    }

    changeTrainingCenterAdress(adress: Adress) : Observable<any> {
        return this.http.put(`${this.apiUrl}api/TrainingCenter/adress`, adress)
    }

    addTrainingCenter(trainingCenter: TrainingCenter) : Observable<any> {
        return this.http.post(`${this.apiUrl}api/TrainingCenter`, trainingCenter)
    }

    getFilteredTrainingCenters(filters: Adress) : Observable<any> {
        return this.http.post(`${this.apiUrl}api/TrainingCenter/filter`, filters);
    }

    getTrainingCenter(id: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/TrainingCenter/${id}`)
    }

    getManagerTrainingCenter(managerId: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/TrainingCenter/manager/${managerId}`)
    }
}
