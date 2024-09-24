import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'src/app/services/api/equipment.service';
import { SerialData } from 'src/app/shared/models/serialData';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EquipmentType } from 'src/app/shared/enum/equipment-type';


@Component({
  selector: 'app-all-equipment-page',
  templateUrl: './all-equipment-page.component.html',
  styleUrls: ['./all-equipment-page.component.scss']
})
export class AllEquipmentPageComponent implements OnInit {
    equipments! : SerialData[];
    items = [
        {label: "Hive", value: EquipmentType.Hive},
        {label: "Hub", value: EquipmentType.Hub},
        {label: "Sensor", value: EquipmentType.Sensor},
    ]
    selectedEquipmentType = EquipmentType.Hive;
    isAddEquipmentDialogOpened: boolean = false;
   
    constructor(private equipmentService: EquipmentService, private confirmationService: ConfirmationService, private messageService: MessageService)
    { }

    ngOnInit(): void {
        this.updateActualEquipment();
    }

    registerEquipment()
    { 
        this.equipmentService.generateNewSerialData(this.selectedEquipmentType).subscribe({
            next: (res) => { 
                this.messageService.add({ severity: 'success', summary: "Success", detail: `New ${res.equipmentName} successfully registered. Serial data: ${res.serialNumber}`}); 
                this.isAddEquipmentDialogOpened = false;
                this.updateActualEquipment();
            },
            error: (error) => { this.messageService.add({ severity: 'error', summary: "Error", detail: error.error?.message }); this.isAddEquipmentDialogOpened = false },
        })
    }

    deleteEquipment(equipmentData: SerialData) { 
        console.log("data:", equipmentData);
        this.confirmationService.confirm({
            message: `Are you really want to delete ${equipmentData.equipmentName} with serial data ${equipmentData.serialNumber}?`,
            header: "Delete confirmation",
            accept: () => {
                this.deleteEquipmentInner(equipmentData);
            }
        })
    }

    openRegisterEquipment() {
        this.isAddEquipmentDialogOpened = true;
    }

    private deleteEquipmentInner(equipmentData: SerialData) {
        this.equipmentService.deleteSerialData(equipmentData.serialNumber).subscribe({
            next: () => {
                this.messageService.add({severity:"success", summary: "Success", detail: "Equipment successfully deleted"})
                this.equipmentService.getAllSerialData().subscribe(res => {
                    this.equipments = res;
                })
            },
            error: () => this.messageService.add({severity:'error', summary: "Error", detail: "Failed to delete. The device is most likely activated and active at the moment"})
        })
    }

    updateActualEquipment() {
        this.equipmentService.getAllSerialData().subscribe(res => {
            this.equipments = res;
        })
    }
}
