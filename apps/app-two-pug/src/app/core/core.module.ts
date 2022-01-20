import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
        path: 'home'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ])
  ]
})
export class CoreModule { }
