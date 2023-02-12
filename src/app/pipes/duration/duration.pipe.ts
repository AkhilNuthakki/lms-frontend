import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(durationInMinutes: number){
    if (durationInMinutes) {
      if (durationInMinutes <= 60) {
        return durationInMinutes + 'mins';
      } else {
        const min = durationInMinutes % 60;
        durationInMinutes = durationInMinutes - min;
        const hr = durationInMinutes / 60;
        return hr + (hr > 1 ? ' hrs ' : ' hr ') + min + ' mins';
      }
    } else {
      return '0 min';
    }
  }

}
