import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { SuccessMessageComponent } from 'src/app/shared/components/success-message/success-message.component';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceSpyObj : jasmine.SpyObj<UserService>;

  beforeEach(async () => {

    userServiceSpyObj = jasmine.createSpyObj('UserService', ['registerUser']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, SuccessMessageComponent, ErrorMessageComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: UserService, useValue: userServiceSpyObj }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); 

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the success message after user is successfully registered', (done: DoneFn) => {
    const responseData: string = 'User added';

    userServiceSpyObj.registerUser.and.returnValue(of(responseData));
    component.onRegister();
    fixture.detectChanges();
    const h5 = fixture.nativeElement.querySelector('h5');
    expect(h5.textContent).toContain('User is sucessfully registerd');
    done();
  });

  it('should show the error message after user email already exists', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'User already exists',
      status: 409,
      statusText: 'Conflict'
    });

    userServiceSpyObj.registerUser.and.returnValue(throwError(() => (errorResponse)));
    component.onRegister();
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toContain(component.errorMessage);
    done();
  });

});
