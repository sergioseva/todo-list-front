import { Injectable } from '@angular/core';
import { FileItem } from '../model/file-item';
import { Observable } from 'rxjs';
import {  HttpClient,HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargarImagenesService {

  private URLFilesService:string="//localhost:8080/fileapi/";

  constructor(private http: HttpClient) {}

   cargarImagen(imagen:FileItem){
    let formdata: FormData = new FormData();
 
    formdata.append('file', imagen.archivo);
    
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
  
    return  this.http.post(this.URLFilesService,formdata,{
      reportProgress: true,
      responseType: 'text'
    });
  }
}
