import {Component} from '@angular/core';
import {NavController, NavParams, } from 'ionic-angular';
import {FormBuilder, Validators, AbstractControl, ControlGroup } from '@angular/common';
import {AnnonceService, Annonce} from '../../providers/annonce-service/annonce-service';
import {UserService, User} from '../../providers/user-service/user-service';
import {AnnoncesPage} from '../annonces/annonces';


/*
  Generated class for the AnnonceEditPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/annonce-edit/annonce-edit.html',
})
export class AnnonceEditPage {
  private annonce: Annonce;
  public form;
  private submitAttempt;
  constructor(public nav: NavController, private navParams: NavParams, public formBuilder: FormBuilder, public userService: UserService, public annonceService: AnnonceService) {
    this.annonce = navParams.data;

    if (this.annonce == null) {
        this.form = this.formBuilder.group({
        '_id': [''],
        'type': ['', Validators.required],
        'title': ['', Validators.required],
        'description': ['', Validators.required]
        });
    }
    else {
      this.form = this.formBuilder.group({
        '_id': [this.annonce._id],
        '_rev': [this.annonce._rev],
        'type': [this.annonce.type, Validators.required],
        'title': [this.annonce.title, Validators.required],
        'description': [this.annonce.description, Validators.required]
      });
    }

  }


   public saveOrUpdate(annonce: Annonce) 
    {
        if (this.form.valid) 
        {
           this.annonceService.saveOrUpdate(annonce);

           this.nav.remove();
           
        }else{
            this.submitAttempt = true;
        }
    }

    public cancel() {
      this.nav.remove();
    }
}
