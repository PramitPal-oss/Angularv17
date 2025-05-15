import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/Services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})

export class CourseDetailComponent implements OnInit, OnDestroy {

  courseService: CourseService = inject(CourseService)
  courseId: number;
  courseData: Course
  activeRouter: ActivatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  courseObserVable$: Subscription;

  ngOnInit(): void {

    //!NOT using Observable
    // this.courseId = +this.activeRouter.snapshot.paramMap.get('id');
    // this.courseData = this.courseService.courses.find(el => el.id === this.courseId)
    // console.log(this.courseData)

    //!NOT using Observable
    // this.courseId = +this.activeRouter.snapshot.params?.['id']
    // this.courseData = this.courseService.courses.find(el => el.id === this.courseId)
    // console.log(this.courseData)

    //? Always use Observable for this case
    this.courseObserVable$ = this.activeRouter.paramMap.subscribe((data) => {
      this.courseId = +data.get('id');
      this.courseData = this.courseService.courses.find(el => el.id === this.courseId)
    })

    //? Always use Observable for this case
    // this.activeRouter.params.subscribe((data) => {
    //   this.courseId = +data['id'];
    //   this.courseData = this.courseService.courses.find(el => el.id === this.courseId)
    // })
  }

  ngOnDestroy(): void {
    this.courseObserVable$.unsubscribe()
  }

  onNextClick() {
    this.courseId++
    if (this.courseId > 8) {
      this.courseId = 1;
      this.router.navigateByUrl(`/courses/course/${this.courseId}`)
      return;
    }
    this.router.navigateByUrl(`/courses/course/${this.courseId}`)
  }

  onPrevClick() {
    this.courseId--
    if (this.courseId < 1) {
      this.courseId = 1
      this.router.navigateByUrl(`/courses/course/${this.courseId}`)
      return;
    }
    this.router.navigateByUrl(`/courses/course/${this.courseId}`)
  }


}
