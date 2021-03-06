import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddForRental } from '../models/addforrental';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44330/api/';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getall';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalById(id:number):Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+'rentals/getbyid?id='+id;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  rentCar(addForRental:AddForRental){
    let newPath=this.apiUrl+'rentals/add';
    return this.httpClient.post<ResponseModel>(newPath,addForRental)
  }
}
