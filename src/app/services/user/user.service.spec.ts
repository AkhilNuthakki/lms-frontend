import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new UserService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user when logged in', (done: DoneFn) => {
    const responseData = {
      user_email_id: 'akhil.nuthakki1@gmail.com',
      user_name: 'AkhilNuthakki',
      user_role: 'ADMIN',
      token: '',
      token_expiration_date: new Date()
    };
    const reqbody = {
      user_email_id: 'akhil.nuthakki1@gmail.com',
      password: 'Pass2022'
    };
    httpClientSpy.post.and.returnValue(of(responseData));

    service.loginUser(reqbody).subscribe({
      next: (response) => {
        expect(response).toEqual(responseData);
        done();
      },
      error: done.fail
    })
  });

  it('should throw error already exists when user registered with existing email', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'User already exists',
      status: 409,
      statusText: 'Conflict'
    });
    const reqbody = {
      user_email_id: 'akhil.nuthakki1@gmail.com',
      user_name: 'AkhilNuthakki',
      password: 'Pass2022'
    };
    httpClientSpy.post.and.returnValue(throwError(() => (errorResponse)));

    service.registerUser(reqbody).subscribe({
      next: () => done.fail('expected an error, not user'),
      error: (errResponse) => {
        expect(errResponse.error).toEqual('User already exists');
        expect(errResponse.status).toEqual(409);
        done();
      }
    })
  });


  it('should throw error password not matched when user logged in with wrong password', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'Password doesn\'t match',
      status: 403,
      statusText: 'Forbidden'
    });
    const reqbody = {
      user_email_id: 'akhil.nuthakki1@gmail.com',
      password: 'Pass2022'
    };
    httpClientSpy.post.and.returnValue(throwError(() => (errorResponse)));

    service.loginUser(reqbody).subscribe({
      next: () => done.fail('expected an error, not user'),
      error: (errResponse) => {
        expect(errResponse.error).toEqual('Password doesn\'t match');
        expect(errResponse.status).toEqual(403);
        done();
      }
    })
  });

  it('should add user when registered', (done: DoneFn) => {
    const responseData: string = 'User added';
    const reqbody = {
      user_email_id: 'akhil.nuthakki1@gmail.com',
      user_name: 'AkhilNuthakki',
      password: 'Pass2022'
    };
    httpClientSpy.post.and.returnValue(of(responseData));

    service.registerUser(reqbody).subscribe({
      next: (response) => {
        expect(response).toEqual(responseData);
        done();
      },
      error: done.fail
    })
  });

});

