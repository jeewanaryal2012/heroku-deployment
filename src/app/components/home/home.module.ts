import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversalModule } from '../../common/universal/universal.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CreateAdComponent } from '../../authorized/create-ad/create-ad.component';


@NgModule({
  declarations: [
    HomeComponent,
    CreateAdComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UniversalModule
  ]
})
export class HomeModule { }
