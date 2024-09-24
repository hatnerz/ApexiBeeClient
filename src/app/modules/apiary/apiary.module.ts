import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiaryListPageComponent } from './apiary-list-page/apiary-list-page.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RouterModule } from '@angular/router';
import { AddApiaryPageComponent } from './add-apiary-page/add-apiary-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { CheckboxModule } from 'primeng/checkbox';
import { ApiaryListComponent } from './apiary-list/apiary-list.component';
import { ApiaryDetailsPageComponent } from './apiary-details-page/apiary-details-page.component';
import { HiveDetailsPageComponent } from './hive-details-page/hive-details-page.component'
import { DataViewModule } from 'primeng/dataview';
import { ChartModule } from 'primeng/chart';
import { RadioButtonModule } from 'primeng/radiobutton'


@NgModule({
    declarations: [
      ApiaryListPageComponent,
      AddApiaryPageComponent,
      ApiaryListComponent,
      ApiaryDetailsPageComponent,
      HiveDetailsPageComponent
    ],
    imports: [
      CommonModule,
      ButtonModule,
      TableModule,
      CheckboxModule,
      FormsModule,
      InputTextareaModule,
      InputTextModule,
      RadioButtonModule,
      ReactiveFormsModule,
      DialogModule,
      DropdownModule,
      PanelModule,
      TranslateModule,
      ChartModule,
      DataViewModule,
      ConfirmDialogModule,
      RouterModule.forChild([
      { 
        path: 'client-list', pathMatch: 'full',
        component: ApiaryListPageComponent
      },
      {
        path: 'add', pathMatch: 'full',
        component: AddApiaryPageComponent
      },
      {
        path: 'details', pathMatch: 'full',
        component: ApiaryDetailsPageComponent
      },
      {
        path: 'hive/:id', pathMatch: 'full',
        component: HiveDetailsPageComponent
      }
      ])
    ]
  })
export class ApiaryModule { }
