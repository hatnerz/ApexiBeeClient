import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dog } from 'src/app/shared/models/dog';
import { DogSkill } from 'src/app/shared/models/dog-skill';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private http: HttpClient,
        @Inject ('API_URL') private apiUrl: string,
    ) { }

    createBackup() : Observable<any> {
        return this.http.post(`${this.apiUrl}api/Admin/db/backup`, '');
    }

    getLastBackupDate() : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Admin/db/lastbackup`);
    }

    restoreDatabaseFromBackup() : Observable<any> {
        return this.http.post(`${this.apiUrl}api/Admin/db/restore`, '');
    }
}
