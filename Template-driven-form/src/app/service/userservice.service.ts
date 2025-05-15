import { EventEmitter, Injectable } from '@angular/core';
import { EditInterface, userInterface } from '../Interface/UserInterface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private userSubject: BehaviorSubject<userInterface[]> = new BehaviorSubject<userInterface[]>([])
  users$ = this.userSubject.asObservable()

  private editUserSubject: BehaviorSubject<EditInterface | null> = new BehaviorSubject<EditInterface | null>(null)
  editUser$ = this.editUserSubject.asObservable()

  constructor() { }

  getUserDetails(userdetails: userInterface) {
    const existingUsers = this.userSubject.getValue()
    this.userSubject.next([...existingUsers, userdetails])
  }

  updateUser(user: userInterface, index: number) {
    const currentUser = this.userSubject.getValue();
    currentUser[index] = user;
    console.log(currentUser, user)
    this.userSubject.next(currentUser)
  }

  setEditUser(userdetails: EditInterface) {
    this.editUserSubject.next(userdetails);
  }

  clearEditUser() {
    this.editUserSubject.next(null);
  }

}
