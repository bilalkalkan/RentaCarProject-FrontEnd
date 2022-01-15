import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'filterbrandpipe'
})
export class FilterbrandpipePipe implements PipeTransform {

  transform(value: Brand[], brandFilterText: string): Brand[] {
    brandFilterText=brandFilterText?brandFilterText.toLocaleLowerCase():""
    return brandFilterText?value.filter((c:Brand)=>c.brandName.toLocaleLowerCase().indexOf(brandFilterText)!==-1):value;
  }

}
