import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  
  isAuth: boolean = false;
  isAdmin: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
      this.userService.getUser().subscribe({ next : (user) => {
        if(user){
          this.isAuth = true;
          this.isAdmin = user.user_role == 'ADMIN' ? true : false;
        }
      }
      });
  }

  onLogout(){
    this.userService.removeUser();
  }

}
