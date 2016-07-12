import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AnnonceService, Annonce} from '../../providers/annonce-service/annonce-service';

/*
  Generated class for the AnnonceDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/annonce-detail/annonce-detail.html',
})
export class AnnonceDetailPage {
    private annonce : Annonce;
  constructor(public nav: NavController, private navParams: NavParams) {
      this.annonce=navParams.data;
  }
}
