import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StartPageComponent } from './start-page/start-page.component';



@NgModule({
  declarations: [
    HomePageComponent,
    StartPageComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    RouterModule.forChild([
        {
            path: '', pathMatch: 'full',
            component: HomePageComponent
        },
        {
            path:'start',
            component: StartPageComponent
        }
    ])
  ]
})
export class HomeModule { }
