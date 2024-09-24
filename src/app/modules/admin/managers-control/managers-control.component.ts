import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/api/auth.service';
import { UserService } from 'src/app/services/api/user.service';
import { TrainingCenterService } from 'src/app/services/api/training-center.service';
import { AuthModel, RegisterModel } from 'src/app/shared/models/auth-models';
import { TrainingCenter } from 'src/app/shared/models/training-center';
import { User, UserAccount } from 'src/app/shared/models/user';

@Component({
  selector: 'app-managers-control',
  templateUrl: './managers-control.component.html',
  styleUrls: ['./managers-control.component.scss']
})
export class ManagersControlComponent implements OnInit {
    addManagerForm!: FormGroup;
    managers!: User[];
    isManagerAddOverlayOpened: boolean = false;
    isManagerModifyOverlayOpened: boolean = false;
    trainingCentersList!: TrainingCenter[];
    modifyManagerForm!: FormGroup<any>;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private messageService: MessageService)
    {}

    ngOnInit(): void {
        this.initAddForm();
        this.initModifyForm();
        this.getAllManagers();
    }

    initAddForm() {
        this.addManagerForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            email: new FormControl('', [Validators.required, Validators.email])
        })
    }

    initModifyForm() {
        this.modifyManagerForm = new FormGroup({
            id: new FormControl(''),
            userAccountId: new FormControl(''),
            email: new FormControl(''),
            username: new FormControl(''),
            firstName: new FormControl(''),
            lastName: new FormControl(''),
        })
    }

    getAllManagers() {
        this.userService.getAllManagersInfo().subscribe({
            next: (response) => {
                this.managers = response;
                console.log(this.managers);
            }
        })
    }

    updateManager() {
        var manager : User = {
            ...this.modifyManagerForm.value
        }

        this.userService.updateUser(manager).subscribe({
            next: (response) => {
                this.messageService.add({severity:'success', summary:'Success', detail:'Manager data sucessfully updated'});
                this.isManagerModifyOverlayOpened = false;
                this.initModifyForm();
                this.getAllManagers();
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary:'Error', detail: error.error.message});
            }
            
        })
    }

    deleteManager(id: string) {

    }

    openAddManager() {
        this.isManagerAddOverlayOpened = true;
    }

    addManager() {
        if(!this.addManagerForm.valid) 
        {
            this.messageService.add({severity:'error', summary:'Error', detail:'You need to fill all fields correclty'});
            return;
        }

        var managerCredentials: RegisterModel = {
            ...this.addManagerForm.value,
            role: 'manager'
        }

        this.authService.register(managerCredentials).subscribe({
            next: (response) => {
                console.log("SUCCESS");
                this.messageService.add({severity:'success', summary:'Success', detail: "Manager successfully added"})
                this.isManagerAddOverlayOpened = false;
                this.getAllManagers();
                this.initAddForm();
            },
            error: (error) => {
                this.messageService.add({severity:'error', summary:'Error', detail: error.error.message});
            }
        })
    }

    startModifyManager(manager: User) {
        this.modifyManagerForm.get('id')?.setValue(manager.id);
        this.modifyManagerForm.get('userAccountId')?.setValue(manager.userAccountId);
        this.modifyManagerForm.get('email')?.setValue(manager.email);
        this.modifyManagerForm.get('username')?.setValue(manager.userName),
        this.modifyManagerForm.get('firstName')?.setValue(manager.firstName),
        this.modifyManagerForm.get('lastName')?.setValue(manager.lastName),
        this.isManagerModifyOverlayOpened = true;
    }

}
