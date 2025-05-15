import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserserviceService } from './service/userservice.service';
import { userInterface } from './Interface/UserInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'basic';

  @ViewChild('regForm') regForm!: NgForm

  userService: UserserviceService = inject(UserserviceService)

  isUpdating: { Id: number | null, status: boolean } = { Id: null, status: false }

  onSubmit() {
    const PAYLOAD: userInterface = { ...this.regForm?.value, fullname: `${this.regForm?.value?.['fname']} ${this.regForm?.value?.['lname']}`, Id: Date.now() }
    if (this.isUpdating.status) {
      this.userService.updateUser(PAYLOAD, this.isUpdating.Id || 0)
      this.userService.clearEditUser();
    }
    else {
      this.userService.getUserDetails(PAYLOAD);
    }
    this.regForm.reset();
    this.isUpdating = { Id: null, status: false }
  }

  getInputClasses(control: NgModel): string {
    if (control.invalid && control.touched) {
      return 'border border-red-500 placeholder:text-red-500';
    } else return 'border border-blue-400 placeholder:text-gray-500'
  }

  ngOnInit(): void {
    this.userService.editUser$.subscribe(el => {
      if (el) {
        this.regForm.setValue({
          fname: el.fname,
          lname: el.lname,
          email: el.email,
          phnumber: el.phnumber
        })
        this.isUpdating = { Id: el.EditId, status: true }
      }
    })
  }

}
