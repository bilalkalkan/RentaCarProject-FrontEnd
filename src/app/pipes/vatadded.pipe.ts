import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vatadded'
})
export class VataddedPipe implements PipeTransform {

  transform(value: number, rate: number): number {
    return value+(value*rate)/100;
  }

}
