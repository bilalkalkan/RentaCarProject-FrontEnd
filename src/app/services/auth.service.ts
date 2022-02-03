import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { UserLoginModel } from '../models/userLoginModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44330/api/auth/';
  

  constructor(private httpClient: HttpClient,private localStorage:LocalStorageService) {}
  login(user: LoginModel):Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'login',
      user
    );
  }
  
  register(user: User) {
    let newPath = this.apiUrl + 'register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user);
  }
  isAuthenticated(){
    let token =this.localStorage.getLocalStorage("token");
    if (token!=null) {
      return true;
    }else{
      return false;
    }
  }
 logOut(){
   localStorage.removeItem('token');
 }
}
