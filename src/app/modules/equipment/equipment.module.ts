import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllEquipmentPageComponent } from './all-equipment-page/all-equipment-page.component';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AllEquipmentPageComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    DialogModule,
    DropdownModule,
    TranslateModule,
    ConfirmDialogModule,
    RouterModule.forChild([
    { 
        path: 'all', pathMatch: 'full',
        component: AllEquipmentPageComponent
    }
    ])
  ]
})
export class EquipmentModule { }
