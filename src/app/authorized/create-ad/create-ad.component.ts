import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { FileService } from '../../_services/file.service';
import { saveAs } from 'file-saver';

const URL = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {
  createAdForm: FormGroup;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  createAdFormData = {
    headLine: '',
    description: ''
  };



  constructor(private formBuilder: FormBuilder, private fileService: FileService) {
    this.uploader = new FileUploader({
      url: URL,
      itemAlias: 'image'
    });
    this.createAdForm = this.formBuilder.group({
      headLine: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initUpload();
  }
  onFileSelected(e) {
    console.log(this.uploader.queue);
  }

  initUpload() {
    console.log(JSON.parse(localStorage.getItem('currentUser')).firstName);
    const user = JSON.parse(localStorage.getItem('currentUser'));


    this.uploader.onAfterAddingFile = (file) => {
      //console.log(file);
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      //this.toastr.success('File successfully uploaded!');
      this.download('');
    };

    let optns = this.uploader.options;
    this.createAdForm.valueChanges.subscribe(res => {
      optns = {
        ...optns,
        additionalParameter: {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          headLine: res.headLine,
          description: res.description
        }
      };
      this.uploader.setOptions(optns);
    });
  }

  /*
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
  */

  // download(e) {
  //   this.fileService.download('').subscribe(res => {
  //     console.log(res);
  //   });
  // }


  imageBlobUrl: any;
  showMyAd = false;
  download(e) {
    this.fileService.download('test.png').subscribe(res => {
      //console.log(res);
      //this.img = res;
      //saveAs(res, 'testfile');
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imageBlobUrl = reader.result;
        this.showMyAd = true;
      }, false);
      if (res) {
        reader.readAsDataURL(res);
      }

    }, err => {
      console.log('err');
    });
  }


}
