import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Course } from 'src/app/interfaces/CourseResponse';
import { CourseService } from 'src/app/services/course/course.service';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { SuccessMessageComponent } from 'src/app/shared/components/success-message/success-message.component';

import { CoursesComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let courseSerivceSpyObj: jasmine.SpyObj<CourseService>;
  let form: NgForm;

  beforeEach(async () => {

    courseSerivceSpyObj = jasmine.createSpyObj('CourseService', ['deleteCourse', 'getAllCourses']);

    await TestBed.configureTestingModule({
      declarations: [CoursesComponent, SuccessMessageComponent, ErrorMessageComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [{ provide: CourseService, useValue: courseSerivceSpyObj }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete the course', (done: DoneFn) => {
    const responseData: string = 'Course deleted';

    const course: Course = {
      id: 'C1234',
      name: 'The Angular Framework',
      duration: 1200,
      technology: 'Web Framework',
      description: 'The testing documentation offers tips and techniques for unit and integration testing Angular applications through a sample application created with the Angular CLI',
      launch_url: 'https://angular.io/guide/testing-services'
    };

    courseSerivceSpyObj.deleteCourse.and.returnValue(of(responseData));
    component.onDelete(course, 0);
    fixture.detectChanges();
    const h5 = fixture.nativeElement.querySelector('h5');
    expect(h5.textContent).toContain('Course is sucessfully deleted');
    done();

  });

});
