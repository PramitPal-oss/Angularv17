import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentagecustom'
})
export class PercentagecustomPipe implements PipeTransform {

  transform(value: number, totalMarks: number, fixed: number = 2): string {
    const percentage = (value / totalMarks) * 100
    return `${percentage.toFixed(fixed)}%`;
  }

}
