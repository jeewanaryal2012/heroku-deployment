import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  download2(fileName: string): Observable<any> {
    // return this.http.get<any>('localhost:8080/files/test.jpg', { responseType: 'blob' }).subscribe(res => {
    //   window.open(window.URL.createObjectURL(res));
    // });
    return this.http.post('http://localhost:8080/files/test.jpg', {},
      { observe: 'response', responseType: 'blob' });
  }
  download(file: String) {
    //return this.http.get<Blob>('http://localhost:8080/download')
    const body = { filename: 'arrow.png' };

    return this.http.post('http://localhost:4040/downloads', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
