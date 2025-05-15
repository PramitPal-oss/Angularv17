import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../Models/course';
import { CourseService } from '../Services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  coursesService = inject(CourseService);
  AllCourses: Course[] = [];
  Router: ActivatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    //? Way of getting queryparams without using observables:

    // const queryParams = this.Router.snapshot.queryParamMap.get('search')
    // const queryParams = this.Router.snapshot.queryParams?.['search']\

    //? Without using observables
    // const courses = this.coursesService.courses.filter(el => el.title.toLowerCase().includes(queryParams.toLowerCase()))

    // if (courses) this.AllCourses = courses
    // else this.AllCourses = this.coursesService.courses


    //? Using Observables:

    this.Router.queryParamMap.subscribe((data) => {
      const queryParams = data.get('search')
      const courses: Course[] = this.Router.snapshot.data?.['courses']?.filter((el: Course) => el.title?.toLowerCase().includes(queryParams?.toLowerCase()))
      if (courses?.length > 0) this.AllCourses = courses
      else this.AllCourses = this.coursesService.courses

      // this.coursesService.getAllcourses()?.subscribe(item => {
      //   const courses = item?.filter(el => el.title?.toLowerCase().includes(queryParams?.toLowerCase()))
      //   if (courses?.length > 0) this.AllCourses = courses
      //   else this.AllCourses = this.coursesService.courses
      // })

    })
  }
}
