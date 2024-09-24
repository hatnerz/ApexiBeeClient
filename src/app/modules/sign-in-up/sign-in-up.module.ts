import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    TranslateModule,
    DropdownModule,
    RouterModule.forChild([
        {
            path: '', pathMatch: 'full',
            redirectTo: 'up'
        },
        {
            path: 'up',
            component: SignUpComponent
        },
        {
            path: 'in',
            component: SignInComponent
        }
    ])
  ]
})
export class SignInUpModule { }
