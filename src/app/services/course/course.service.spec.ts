import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Course } from 'src/app/interfaces/CourseResponse';

import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;
  let httpClientSpy : jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    
    httpClientSpy = jasmine.createSpyObj('HttpClient',['post', 'get', 'delete']);
    service = new CourseService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add the course', (done : DoneFn) => {
    const responseData: string = 'Course added';
    const reqbody = {
      name: 'The Angular Framework',
      duration: 1200,
      technology: 'Web Framework',
      description: 'The testing documentation offers tips and techniques for unit and integration testing Angular applications through a sample application created with the Angular CLI',
      launch_url: 'https://angular.io/guide/testing-services',
    };
    httpClientSpy.post.and.returnValue(of(responseData));

    service.addCourse(reqbody).subscribe({
      next: (response) => {
        expect(response).toEqual(responseData);
        done();
      },
      error: done.fail
    })
  });

  it('should delete the course', (done : DoneFn) => {
    const responseData: string = 'Course deleted';
    const pathVariable: string = 'C1234'
    httpClientSpy.delete.and.returnValue(of(responseData));

    service.deleteCourse(pathVariable).subscribe({
      next: (response) => {
        expect(response).toEqual(responseData);
        done();
      },
      error: done.fail
    })
  });

  it('should get all the course', (done : DoneFn) => {
    const responseData: Course[] = [
      {
        id: 'C1234',
        name: 'The Angular Framework',
        duration: 1200,
        technology: 'Web Framework',
        description: 'The testing documentation offers tips and techniques for unit and integration testing Angular applications through a sample application created with the Angular CLI',
        launch_url: 'https://angular.io/guide/testing-services'
      }
    ];
    httpClientSpy.get.and.returnValue(of(responseData));

    service.getAllCourses().subscribe({
      next: (response) => {
        expect(response).toEqual(responseData);
        done();
      },
      error: done.fail
    })
  });

  it('should get courses based on technology', (done : DoneFn) => {
    const responseData: Course[] = [
      {
        id: 'C1234',
        name: 'The Angular Framework',
        duration: 1200,
        technology: 'Web Framework',
        description: 'The testing documentation offers tips and techniques for unit and integration testing Angular applications through a sample application created with the Angular CLI',
        launch_url: 'https://angular.io/guide/testing-services'
      }
    ];
    const technology: string = 'Web Framework'
    httpClientSpy.get.and.returnValue(of(responseData));

    service.getCoursesBasedOnTechnology(technology).subscribe({
      next: (response) => {
        expect(response).toEqual(responseData);
        done();
      },
      error: done.fail
    })
  });


  it('should get courses based on technology and duration range', (done : DoneFn) => {
    const responseData: Course[] = [
      {
        id: 'C1234',
        name: 'The Angular Framework',
        duration: 1200,
        technology: 'Web Framework',
        description: 'The testing documentation offers tips and techniques for unit and integration testing Angular applications through a sample application created with the Angular CLI',
        launch_url: 'https://angular.io/guide/testing-services'
      }
    ];
    const technology: string = 'Web Framework'
    const durationFrom: number = 1000;
    const durationTo: number = 1200;
    httpClientSpy.get.and.returnValue(of(responseData));

    service.getCoursesBasedOnTechnologyAndDuration(technology,durationFrom,durationTo).subscribe({
      next: (response) => {
        expect(response).toEqual(responseData);
        done();
      },
      error: done.fail
    })
  });


});
