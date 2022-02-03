import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
user:User
isAuthenticated : boolean

  constructor(private userService:UserService,private modalService:NgbModal,private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated=this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.getDetail();
    }
  }

  getDetail(){
    this.userService.getUserDetail().subscribe((response)=>{
      this.user=response.data;
    })
  }

   showEditModal(){
     const profileEditModal = this.modalService.open(UpdateUserComponent)
    profileEditModal.componentInstance.user = this.user;
     profileEditModal.componentInstance.reloadPage.subscribe(()=>{
       this.getDetail();
     })
   }
}
