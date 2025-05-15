import { Injectable } from "@angular/core";

@Injectable()
export class CurrentService {

  currentSerTree() {
    console.log('This is the current service which is dected from this CurrentService')
  }

}