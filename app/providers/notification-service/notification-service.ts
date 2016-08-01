import {Injectable, Inject, Component} from '@angular/core';
import {NavController, Alert, Loading} from 'ionic-angular';
import * as PouchDB from 'pouchdb';
/*
  Generated class for the NotificationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class NotificationService {
  public loading:Loading;


  constructor() {}

  public showLoading(nav: NavController)
  {
    this.loading=Loading.create({content:"Please wait..."});

    nav.present(this.loading);
  }

  public closeLoading()
  {
    this.loading.dismiss();
  }

  public showError(text : string, nav: NavController)
  {
      setTimeout(() => {
        this.loading.dismiss();
      });
      let prompt = Alert.create({
        title: 'error',
        subTitle: text,
        buttons:['Ok']
      });

      nav.present(prompt);
  }
}

