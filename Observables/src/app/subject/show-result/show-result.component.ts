import { Component, OnInit } from '@angular/core';
import { CounterServiceService } from '../../service/counter-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-show-result',
  templateUrl: './show-result.component.html',
  styleUrl: './show-result.component.css'
})
export class ShowResultComponent implements OnInit {

  total_Count_sub: number = 0
  total_Count_behaviour: number = 0


  constructor(private countService: CounterServiceService) { }

  ngOnInit(): void {
    this.countService.count$.subscribe((el) => {
      this.total_Count_behaviour = el
    })

    this.countService.count2$.subscribe((el) => {
      this.total_Count_sub = el
    })

  }

}
