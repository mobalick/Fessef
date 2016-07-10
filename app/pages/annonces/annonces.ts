import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Truncate} from '../../pipes/truncate';
import {AnnonceService, Annonce} from '../../providers/annonce-service/annonce-service';
import {FormBuilder, Validators, AbstractControl, ControlGroup } from '@angular/common';
import {UserService, User} from '../../providers/user-service/user-service';


/*
  Generated class for the AnnoncesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/annonces/annonces.html',
  pipes: [Truncate],
  providers:[AnnonceService]
})

export class AnnoncesPage {
  private annonces;
  private action;
  private createForm;
  constructor(public nav: NavController,  public formBuilder : FormBuilder, public annonceService : AnnonceService, public userService : UserService) {
    this.action="list";
    
    this.refreshList();

    
  }
 
 public refreshList()
 {
    this.annonceService.getAll().then(ans => {
      this.annonces = ans === '' ? null : ans.res.rows;
    });
 }

  public add()
  {
    this.createForm = this.formBuilder.group({
      'id': ['', Validators.required],
      'type': ['', Validators.required],
      'title': ['', Validators.required],
      'description': ['', Validators.required]
    });

    this.action="create";
  }

  public cancel()
  {
    this.action="list";
  }

  public create(annonce :Annonce)
  {
    //annonce.creationDate = new Date();
    annonce.userId = this.userService.user.id;
    annonce.userMail = this.userService.user.email;

    console.log(annonce)
    
    this.annonceService.save(annonce);
    this.action="list";
    this.refreshList();
  }

  public edit(annonce:Annonce)
  {
     this.createForm = this.formBuilder.group({
      'id': [annonce.id, Validators.required],
      'type': [annonce.type, Validators.required],
      'title': [annonce.title, Validators.required],
      'description': [annonce.description, Validators.required]
    });

    this.action="create";
  }
}
