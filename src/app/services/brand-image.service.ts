import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandImage } from '../models/brandImage';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandImageService {
  apiUrl = 'https://localhost:44330/api/';
  
  constructor(private httpClient:HttpClient) { }
  imageAdd(brandImageAdd:BrandImage):Observable<ResponseModel>{
let newPath=this.apiUrl+"BrandImages/add";
return this.httpClient.post<ResponseModel>(this.apiUrl+"BrandImages/add",brandImageAdd)
  }
}
