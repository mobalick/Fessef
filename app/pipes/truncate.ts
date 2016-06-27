import {Injectable, Pipe} from '@angular/core';

/*
  Generated class for the Truncate pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'truncate'
})
@Injectable()
export class Truncate {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: string, args) {
    let limit = parseInt(args);

    var ret=value.length > limit ? value.substring(0, limit) + '...' : value;
    
    console.log(ret);
    return ret;
  }
}
