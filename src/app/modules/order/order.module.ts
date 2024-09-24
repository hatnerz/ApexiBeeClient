import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ClientOrdersPageComponent } from './client-orders-page/client-orders-page.component';
import { ManagerOrdersPageComponent } from './manager-orders-page/manager-orders-page.component';
import { OrderListComponent } from './order-list/order-list.component';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    ClientOrdersPageComponent,
    ManagerOrdersPageComponent,
    OrderListComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    ProgressSpinnerModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    InputNumberModule,
    RouterModule.forChild([
        {
            path: 'client-list',
            component: ClientOrdersPageComponent
        },
        {
            path: 'manager-list',
            component: ManagerOrdersPageComponent
        }
    ])
  ]
})
export class OrderModule { 

}
