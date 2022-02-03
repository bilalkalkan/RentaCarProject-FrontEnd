import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl='https://localhost:44330/api/'
  constructor(private httpClient:HttpClient) { }
  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath=this.apiUrl+'customers/getcustomersdetails';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath)

    }

    
  getCustomerByUserId(userId:number) : Observable<SingleResponseModel<Customer>> {
    let newPath = this.apiUrl + "customers/getbyuserid?userId="+userId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
   }
}
