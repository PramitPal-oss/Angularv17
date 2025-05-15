import { Component, inject, OnInit } from '@angular/core';
import { userInterface } from '../Interface/UserInterface';
import { UserserviceService } from '../service/userservice.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  userList: userInterface[] = []

  userService = inject(UserserviceService);

  ngOnInit(): void {
    this.userService.users$.subscribe((el) => {
      this.userList = el;
    })
  }
  onEditHandler(user: userInterface, i: number) {
    this.userService.setEditUser({ ...user, EditId: i })
  }
}
