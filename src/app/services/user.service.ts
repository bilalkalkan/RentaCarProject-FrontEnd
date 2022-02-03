import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44330/api/';
  constructor(private httpClient:HttpClient) { }
getUserDetail():Observable<SingleResponseModel<User>>{
let newPath=this.apiUrl+"Users/getuserdetail"
return this.httpClient.get<SingleResponseModel<User>>(newPath);
}
getByUserId(userId:number):Observable<SingleResponseModel<User>>{
let newPath=this.apiUrl+"Users/getbyuserid?userId="+userId;
return this.httpClient.get<SingleResponseModel<User>>(newPath)
}
update(user:User):Observable<ResponseModel>{
  let newPath=this.apiUrl+"Users/update";
  return this.httpClient.post<ResponseModel>(newPath,user);
}
}
