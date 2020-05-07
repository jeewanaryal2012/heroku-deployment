import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  uploader: FileUploader;
  url = 'http://localhost:4040/user-profile-picture';
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    this.uploader = new FileUploader({
      url: this.url,
      headers: [
        { name: 'authorization', value: this.authenticationService.currentUserValue.accessToken },
        { name: 'email', value: this.authenticationService.currentUserValue.email }
      ],
      itemAlias: 'image'
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      console.log(response);
    };
  }

  initUpload() {
    return this.uploader;
  }

  getUserProfile(email): Observable<any> {
    return this.http.post<any>('http://localhost:4040/user-profile', { email });
  }
}
