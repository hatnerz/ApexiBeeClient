import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserAccount } from 'src/app/shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient, 
        @Inject('API_URL') private apiUrl: string
    ) {}

    getAllManagersInfo() : Observable<any> {
        return this.http.get(`${this.apiUrl}api/User/managersInfo`);
    }

    getAllBeekeepersInfo() : Observable<any> {
        return this.http.get(`${this.apiUrl}api/User/beekeepersInfo`);
    }

    updateUser(user: User) : Observable<any> {
        return this.http.put(`${this.apiUrl}api/User`, user);
    }

    deleteUser(userId: number) : Observable<any> {
        return this.http.delete(`${this.apiUrl}api/User/${userId}`);
    }

   /* convertManagersListToViewList(managers: Manager[]) : ManagerViewModel[] {
        var convertedManagers: ManagerViewModel[] = []
        for(let manager of managers) {
            var managerViewModel: ManagerViewModel = {
                id: manager.id,
                firstName: manager.firstName,
                lastName: manager.lastName,
                dogTrainingCenterName: `${manager.dogTrainingCenter?.name} (id: ${manager.dogTrainingCenter?.id})`,
                login: manager.authCredential?.login
            }
            convertedManagers.push(managerViewModel);
        }
        return convertedManagers;
    } */
}
