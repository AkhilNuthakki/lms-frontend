import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseRequest } from 'src/app/interfaces/CourseRequest';
import { CourseService } from 'src/app/services/course/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courseAdded: boolean = false;
  errorMessage: string | undefined;
  courseForm: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.minLength(20)]),
    'duration': new FormControl(null, [Validators.required, Validators.min(1)]),
    'technology': new FormControl(null, Validators.required),
    'description': new FormControl(null, [Validators.required, Validators.minLength(100)]),
    'launchurl': new FormControl(null, Validators.required),
  });

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseAdded = false;
    this.errorMessage = undefined;
    this.courseForm.reset();
  }

  onSubmit(): void {
    this.courseAdded = false;
    this.errorMessage = undefined;

    const CourseRequestBody = new CourseRequest(this.courseForm.value.name, this.courseForm.value.duration,
      this.courseForm.value.technology, this.courseForm.value.description, this.courseForm.value.launchurl);

    this.courseService.addCourse(CourseRequestBody).subscribe({
      next: () => {
        this.courseAdded = true;
        this.courseForm.reset();  
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });

  }

}
