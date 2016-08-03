import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Annonce, AnnonceService} from "../providers/annonce-service/annonce-service"
/*
  Generated class for the AnnonceSearch pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'annonceSearch',
  pure: false
})
@Injectable()
export class AnnonceSearch {

  constructor(public annonceService :AnnonceService){}

  transform(annonces: Annonce[], params: string) {
    if(annonces == null) { return this.annonceService.getAll(); }
    if(params.length==0) { return annonces; }
    let query = params.toLowerCase();
    console.log("query", query);
    
    this.annonceService.query(query).then(result=>{
       return result.docs;
    });


    // return annonces.filter(annonce =>
    //   annonce.title.toLowerCase().indexOf(query) > -1 
    // );
  } 
//See more at: http://www.codingandclimbing.co.uk/blog/ionic-2-filter-an-array-by-a-property-value-21#sthash.ctddbaBp.dpuf
}
