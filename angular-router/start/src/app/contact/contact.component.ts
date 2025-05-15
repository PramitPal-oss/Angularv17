import { Component } from '@angular/core';
import { IDeaActivate } from '../Services/activateGaurd.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements IDeaActivate {
  InitialState = { fName: '', lName: '', country: '', subject: '' }
  fields: { fName: string, lName: string, country: string, subject: string } = this.InitialState
  isSubmitting: boolean = false;

  onSubmit() {
    console.log(this.fields)
    this.fields = this.InitialState
    this.isSubmitting = true
  }

  canExit(): boolean {
    if ((this.fields.fName || this.fields.lName || this.fields.country || this.fields.subject) && !this.isSubmitting)
      return confirm('You have unsaved changes! Do you really want to proceed next page ?')
    else return true
  }

}
