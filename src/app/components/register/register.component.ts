import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterUserRequest } from 'src/app/interfaces/RegisterUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userAdded: boolean = false;
  errorMessage: string | undefined;
  registerForm: FormGroup = new FormGroup({
    'useremail': new FormControl(null, [Validators.required, Validators.email]),
    'username': new FormControl(null, Validators.required),
    'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern("[a-zA-Z0-9]+")]),
  });

  constructor(private userService: UserService) {}
  
  
  ngOnInit(): void {
    this.userAdded = false;
    this.errorMessage = undefined;
    this.registerForm.reset();
  }


  onRegister(){

    this.userAdded = false;
    this.errorMessage = undefined;

    const requestBody = new RegisterUserRequest(this.registerForm.value.useremail,
       this.registerForm.value.username, this.registerForm.value.password); 

    this.userService.registerUser(requestBody).subscribe({
      next: () => {
          this.userAdded = true;
      },
      error: (error) => {
        this.errorMessage = error.error;
      }
    });


  }

}
