import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddForCreditCard } from '../models/addforcreditcard';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  apiUrl = 'https://localhost:44330/api/';

  constructor(private httpClient: HttpClient) {}
  save(creditCard: AddForCreditCard): Observable<AddForCreditCard> {
    let newPath = this.apiUrl + 'CreditCards/save';
    return this.httpClient.post<AddForCreditCard>(newPath, creditCard);
  }

  getCards():Observable<ListResponseModel<AddForCreditCard>>{
    let newPath = this.apiUrl + 'CreditCards/getcards';
    return this.httpClient.get<ListResponseModel<AddForCreditCard>>(newPath);
  }
}
