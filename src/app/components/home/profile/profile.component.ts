import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { AuthenticationService } from '../../../_services/authentication.service';
import { RegisterService } from '../../../_services/register.service';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { UserProfileService } from '../../../_services/user-profile.service';

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
    private userProfileService: UserProfileService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    console.log(this.authenticationService.currentUserValue);
    this.initForm();
    this.uploader = this.userProfileService.initUpload();
    this.uploader.setOptions({
      additionalParameter: {
        email: this.authenticationService.currentUserValue.userName
      }
    });
  }

  initForm() {
    this.profileForm = this.formBuilder.group({

    });
  }

  initUpload() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
    };
  }

  onFileSelected(e) {
    console.log(this.uploader.queue);
  }

}
