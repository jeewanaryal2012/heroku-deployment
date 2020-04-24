import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversalModule } from '../../common/universal/universal.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CreateAdComponent } from '../../authorized/create-ad/create-ad.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    HomeComponent,
    CreateAdComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UniversalModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FileUploadModule
  ]
})
export class HomeModule { }
