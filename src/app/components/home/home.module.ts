import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversalModule } from '../../common/universal/universal.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UniversalModule
  ]
})
export class HomeModule { }
