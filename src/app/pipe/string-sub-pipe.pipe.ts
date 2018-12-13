import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringSubPipe'
})
export class StringSubPipePipe implements PipeTransform {

  transform(value: string, length: number): string {
    return value.substr(0, length);
  }

}
