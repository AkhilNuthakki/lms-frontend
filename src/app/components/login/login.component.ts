import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserRequest } from 'src/app/interfaces/LoginUserRequest';
import { User } from 'src/app/interfaces/User.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user: User | undefined;
  errorMessage: string | undefined;
  loginForm: FormGroup = new FormGroup({
    'useremail': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, Validators.required),
  });

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
      this.errorMessage = undefined;
  }

  onLogin() {
    this.errorMessage = undefined;

    const requestBody = new LoginUserRequest(this.loginForm.value.useremail, this.loginForm.value.password);

    this.userService.loginUser(requestBody).subscribe({
      next: () => {
        this.user = new User(this.loginForm.value.useremail);
        this.userService.setUser(this.user);
        this.router.navigate(['/courses']);
      }, error: (error) => {
        this.errorMessage = error.error;
      }
    });

  }

}
