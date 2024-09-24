import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dog } from 'src/app/shared/models/dog';
import { DogSkill } from 'src/app/shared/models/dog-skill';

@Injectable({
    providedIn: 'root'
})
export class DogService {

    constructor(
        private http: HttpClient,
        @Inject ('API_URL') private apiUrl: string,
        ) { }

    addDog(dog: Dog) : Observable<any> {
        return this.http.post(`${this.apiUrl}api/Dog`, dog)
    }

    changeDog(dog: Dog) : Observable<any> {
        return this.http.patch(`${this.apiUrl}api/Dog`, dog)
    }

    addSkillToDog(dogSkill: DogSkill) : Observable<any> {
        return this.http.post(`${this.apiUrl}api/Dog/skill`, dogSkill);
    }

    changeDogSkill(dogSkill: DogSkill) : Observable<any> {
        return this.http.put(`${this.apiUrl}api/Dog/skill`, dogSkill);
    }

    deleteDog(dogId: number) : Observable<any> {
        return this.http.delete(`${this.apiUrl}api/Dog/${dogId}`);
    }

    getClientDogs(clientId: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Dog/client/${clientId}`);
    }

    getDogSkills(dogId: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Dog/skill/${dogId}`);
    }

    getDogSkillChange(dogId: number, skillId: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Dog/skillchange/${dogId}/${skillId}`);
    }

    getDog(id: number) : Observable<any> {
        return this.http.get(`${this.apiUrl}api/Dog/${id}`);
    }
}
