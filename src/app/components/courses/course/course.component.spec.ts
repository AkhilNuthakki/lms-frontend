import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CourseService } from 'src/app/services/course/course.service';
import { ErrorMessageComponent } from 'src/app/shared/components/error-message/error-message.component';
import { SuccessMessageComponent } from 'src/app/shared/components/success-message/success-message.component';

import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let courseSerivceSpyObj: jasmine.SpyObj<CourseService>;

  beforeEach(async () => {

    courseSerivceSpyObj = jasmine.createSpyObj('CourseService', ['addCourse']);

    await TestBed.configureTestingModule({
      declarations: [ CourseComponent, SuccessMessageComponent, ErrorMessageComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [ {provide: CourseService, useValue: courseSerivceSpyObj }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseComponent);
    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add course', (done: DoneFn) => {
    const responseData: string = 'Course added';

    courseSerivceSpyObj.addCourse.and.returnValue(of(responseData));
    component.onSubmit();
    fixture.detectChanges();
    const h5 = fixture.nativeElement.querySelector('h5');
    expect(h5.textContent).toContain('Course is sucessfully added');
    done();
  });

});
