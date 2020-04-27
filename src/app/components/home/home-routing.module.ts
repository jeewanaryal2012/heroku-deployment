import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { CreateAdComponent } from '../../authorized/create-ad/create-ad.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'ad', // child route path
        component: CreateAdComponent // child route component that the router renders
      }
    ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
