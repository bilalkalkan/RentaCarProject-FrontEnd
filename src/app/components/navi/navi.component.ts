import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxBootstrapIconsModule,allIcons } from 'ngx-bootstrap-icons';
import { User } from 'src/app/models/user';
import { UserForLocalStorage } from 'src/app/models/userLocalStorage';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  isVerified: boolean = false;
  userName:string;
  claim:string;

  constructor(private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorageService,private userService:UserService) { 
    
  }

  ngOnInit(): void {
    this.IsUserVerified();
    if(this.isVerified){
      this.getUserName();
      this.getUserClaim();
    }
  }
  IsUserVerified() {
    if (this.authService.isAuthenticated()) {
      this.isVerified = true;
    } else {
      this.isVerified = false;
    }
  }
  getUserName() {
    this.userName = this.localStorage.getUserNameDecodeToken();
  }

  getUserClaim() {
    this.claim = this.localStorage.getClaimsDecodeToken();
  }


 
  logOut(){
    localStorage.removeItem('token')
  }
}
