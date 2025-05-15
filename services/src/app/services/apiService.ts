import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface PostInterface {
  userId: number,
  id: number,
  title: string,
  body: string
}

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  getAllRecords(): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>('https://jsonplaceholder.typicode.com/posts')
  }
}