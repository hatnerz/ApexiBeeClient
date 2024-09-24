import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBaseComponent } from './data-base/data-base.component';
import { ManagersControlComponent } from './managers-control/managers-control.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    DataBaseComponent,
    ManagersControlComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    TranslateModule,
    DialogModule,
    ProgressSpinnerModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        {
            path: 'database',
            component: DataBaseComponent
        },
        {
            path: 'managers',
            component: ManagersControlComponent,
        }
    ])
  ]
})
export class AdminModule { }
