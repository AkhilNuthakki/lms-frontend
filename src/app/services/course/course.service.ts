import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/interfaces/CourseResponse';
import { CourseRequest } from 'src/app/interfaces/CourseRequest';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  addCourse(requestbody: CourseRequest): Observable<any> {
    return this.http.post('/api/v1.0/lms/courses/add', requestbody, {responseType: 'text'});
  }

  deleteCourse(courseId: string | undefined): Observable<any> {
    return this.http.delete(`/api/v1.0/lms/courses/delete/${courseId}`, {responseType: 'text'});
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/v1.0/lms/courses/getAll', {responseType: 'json'});
  }

  getCoursesBasedOnTechnology(technology: string): Observable<Course[]> {
    return this.http.get<Course[]>(`/api/v1.0/lms/courses/info/${technology}`, {responseType: 'json'});
  }

  getCoursesBasedOnTechnologyAndDuration(technology: string, durationFrom: number, durationTo: number): Observable<Course[]> {
    return this.http.get<Course[]>(`/api/v1.0/lms/courses/get/${technology}/${durationFrom}/${durationTo}`, {responseType: 'json'});
  }


}
