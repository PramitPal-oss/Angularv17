import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent {
  courseService = inject(CourseService)
  popularCourses: Course[] = [];
  router: Router = inject(Router)

  ngOnInit() {
    this.popularCourses = this.courseService.courses.filter(c => c.rating >= 4.5);
  }

  naviagetCoursePage() {
    this.router.navigateByUrl('/courses')
    // this.router.navigate(['courses'])
  }
}
