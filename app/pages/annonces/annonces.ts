import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {Truncate} from '../../pipes/truncate';
import {AnnonceSearch} from '../../pipes/AnnonceSearch';
import {AnnonceService, Annonce} from '../../providers/annonce-service/annonce-service';
import {FormBuilder, Validators, AbstractControl, ControlGroup } from '@angular/common';
import {UserService, User} from '../../providers/user-service/user-service';
import {AnnonceDetailPage} from '../annonce-detail/annonce-detail';

/*
  Generated class for the AnnoncesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/annonces/annonces.html',
  pipes: [Truncate, AnnonceSearch],
  providers: [AnnonceService]
})

export class AnnoncesPage {
    private annonces;
    private action;
    private createForm;
    private userImage;
    private annonce : Annonce;
    private submitAttempt;
    private segment = "list";
    private favorites : Annonce[];
    private queryText = "";

    constructor(public nav: NavController, public formBuilder: FormBuilder, public annonceService: AnnonceService, public userService: UserService) {
        this.action = this.segment;

        this.refreshList();

    }

    public refreshList() {

        // this.annonceService.getAll().then(a => {
        //     this.annonces  = a;
        // }); 

        this.favorites  = JSON.parse(window.localStorage.getItem("annoncesFavorites")); 
        if (this.favorites==null) {
            this.favorites = []
        }
    }

    public add() {
        this.createForm = this.formBuilder.group({
        'id': [''],
        'type': ['', Validators.required],
        'title': ['', Validators.required],
        'description': ['', Validators.required]
        });

        this.action = "create";
    }

    public cancel() {
        this.action = this.segment;
    }

    public create(annonce: Annonce) 
    {
        if (this.createForm.valid) 
        {
            annonce.userId = this.userService.user.uid;
            annonce.userMail = this.userService.user.email;

            if (!annonce.id) 
            {
                this.annonces.push(annonce);
            }
            else 
            {
                this.annonces.update(annonce.id, annonce);
            }
            this.action = this.segment;
            this.refreshList();
        }else{
            this.submitAttempt = true;
        }
    }

    public edit(annonce: Annonce) 
    {
        if (annonce.userId == this.userService.user.uid) 
        {
            this.createForm = this.formBuilder.group({
                'id': [annonce.$key],
                'type': [annonce.type, Validators.required],
                'title': [annonce.title, Validators.required],
                'description': [annonce.description, Validators.required]
            });

            this.action = "create";
            
        }
        else
        {
            this.nav.push(AnnonceDetailPage, annonce);
        }
    }
 
    public delete(annonce : Annonce)
    {
         this.annonces.remove(annonce);
    }
    
    public updateListMode()
    {
         this.action = this.segment;
    }
    
    public addFavorite(annonce : Annonce)
    {
        this.removeFavorite(annonce);

        this.favorites.push(annonce);
        window.localStorage.setItem("annoncesFavorites", JSON.stringify(this.favorites));
    }
    
    public removeFavorite(annonce : Annonce)
    {
        this.favorites = this.favorites.filter(function( obj ) {
                                                    return obj.id !== annonce.id;
                                                });
        window.localStorage.setItem("annoncesFavorites", JSON.stringify(this.favorites));
    }

    public isInFavorite(annonce : Annonce)
    {
        let result= this.favorites.filter(function( obj ) {
                                                    return obj.id === annonce.id;
                                                });
        return result.length>0;
    }

    public isMine(annonce: Annonce)
    {
        return annonce.userId == this.userService.user.uid;
    }
    
}
