import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/interfaces/CourseResponse';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  coursesList: Course[] = [];
  technology: string | undefined;
  durationFrom: number | undefined;
  durationTo: number | undefined;
  isCoursesFetched: boolean = false;
  courseDeleted: boolean = false;
  errorMessage: string | undefined;
  filterErrorMessage: string | undefined;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.durationFrom = undefined;
    this.durationTo = undefined;
    this.technology = undefined;
    this.isCoursesFetched = false;
    this.courseDeleted = false;
    this.errorMessage = undefined;
    this.filterErrorMessage = undefined;
  }

  onSubmit(form: NgForm) {

    this.isCoursesFetched = false;
    this.courseDeleted = false;
    this.errorMessage = undefined;
    this.filterErrorMessage = undefined;
    this.coursesList = [];

    if (form.value.durationFrom != undefined && form.value.durationFrom != null && form.value.durationFrom != ''
      && form.value.durationTo != undefined && form.value.durationTo != null && form.value.durationTo != ''
      && form.value.technology != undefined && form.value.technology != null && form.value.technology != '') {

      this.courseService.getCoursesBasedOnTechnologyAndDuration(form.value.technology,
        form.value.durationFrom, form.value.durationTo).subscribe(response => {
          this.isCoursesFetched = true;
          this.coursesList = response;
        }, (error) => {
          if(error.error == 'Course Not Found'){
            this.isCoursesFetched = true;
          }else {
            this.filterErrorMessage = error.error;
          }
        });

    } else if (form.value.technology != undefined && form.value.technology != null && form.value.technology != '') {

      this.courseService.getCoursesBasedOnTechnology(form.value.technology).subscribe(response => {
        this.isCoursesFetched = true;
        this.coursesList = response;
      }, (error) => {
        if(error.error == 'Course Not Found'){
          this.isCoursesFetched = true;
        }else {
          this.filterErrorMessage = error.error;
        }
      });

    } else {

      this.courseService.getAllCourses().subscribe(response => {
        this.isCoursesFetched = true;
        this.coursesList = response;
      }, (error) => {
        if(error.error == 'Course Not Found'){
          this.isCoursesFetched = true;
        }else {
          this.filterErrorMessage = error.error;
        }
      });
    }

  }

  onClear(){
    this.courseDeleted = false;
    this.errorMessage = undefined;
    this.durationFrom = undefined;
    this.durationTo = undefined;
    this.technology = undefined;
    this.isCoursesFetched = false;
    this.coursesList = [];
  }

  onDelete(course : Course, index: number){
    this.courseDeleted = false;
    this.errorMessage = undefined;

    this.courseService.deleteCourse(course.id).subscribe({ next : () => {
      this.courseDeleted = true;
      this.coursesList.splice(index, 1);
    }, error : (error) => {
      this.errorMessage = error.error;
    }})

  }


}
