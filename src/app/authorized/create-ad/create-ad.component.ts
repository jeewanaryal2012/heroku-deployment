import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

const URL = 'http://localhost:3000/upload';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {
  loginForm: FormGroup;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  constructor(private formBuilder: FormBuilder) {
    this.initUpload();
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number,
      headers: ParsedResponseHeaders) => {
      console.log("onSuccessItem " + status, response, item);
      if (response) { //parse your response.
      }
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      headline: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  initUpload() {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe(res => this.response = res);
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      console.log(fileItem);
    };

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }
  onFileSelected(e) {
    console.log(this.uploader.queue);
  }

}
