import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { AuthenticationService } from '../../../_services/authentication.service';
import { RegisterService } from '../../../_services/register.service';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

const URL = 'http://localhost:4040/uploads';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  uploader: FileUploader;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService
  ) {
    this.uploader = new FileUploader({
      url: URL,
      itemAlias: 'image'
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      headLine: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  onFileSelected(e) {
    console.log(this.uploader.queue);
  }

}
