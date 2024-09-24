import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    TranslateModule,
    ButtonModule,
    RouterModule.forChild([
        {
            path: '',
            component: SettingsPageComponent
        }
    ])
  ]
})
export class SettingsModule { }
