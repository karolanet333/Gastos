import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numeric'})
export class NumericPipe implements PipeTransform {
  transform(value: string, args: string[]): any {

    var strRpta: string = parseFloat(value).toFixed(2).toString();

    if (!value) return value;

    strRpta = strRpta.replace(".", args.toString());
    
    return strRpta;

  }
}