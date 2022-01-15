import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carİmages } from '../models/carimage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimagesService {
apiUrl='https://localhost:44330/api/';

  constructor(private httpClient:HttpClient) { }
getCarImages():Observable<ListResponseModel<Carİmages>>{
let newPath=this.apiUrl+"CarImages/getall";
return this.httpClient.get<ListResponseModel<Carİmages>>(newPath)
}

  carImageAdd(carImages:Carİmages):Observable<ResponseModel>{
   
    return this.httpClient.post<ResponseModel>(this.apiUrl+"CarImages/add",carImages)
  }

  carImageDelete(carImages:Carİmages):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"CarImages/delete",carImages)
  }
}
