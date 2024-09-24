import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './pages/skeleton/skeleton.component';

const routes: Routes = [
    {
        path: '',
        component: SkeletonComponent,
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule)
            },
            {
                path: 'sign',
                loadChildren: () => import('./modules/sign-in-up/sign-in-up.module').then((m) => m.SignInUpModule)
            },
            {
                path: 'admin',
                loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule)
            },
            {
                path: 'settings',
                loadChildren: () => import('./modules/settings/settings.module').then((m) => m.SettingsModule)
            },
            {
                path: 'equipment',
                loadChildren: () => import('./modules/equipment/equipment.module').then(m => m.EquipmentModule)
            },
            {
                path: 'order',
                loadChildren: () => import('./modules/order/order.module').then((m) => m.OrderModule)
            },
            {
                path: 'apiary',
                loadChildren: () => import('./modules/apiary/apiary.module').then((m) => m.ApiaryModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
