import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import { Timestamp } from 'rxjs';


@Pipe({
  name: 'dateTimestampPipe',
  standalone: true
})
export class DateTimestampPipe implements PipeTransform {


  transform(value: Timestamp | Date, format = 'medium'): string {

    const convertedDate = this.convertToDate(value);
    return formatDate(convertedDate, format, 'en-US') as string;
  }

  private convertToDate(value: Timestamp | Date): Date {
    if (value instanceof Timestamp) {
      return value.toDate();
    }

    return value;
  }

}
