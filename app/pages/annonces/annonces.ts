import {Component} from '@angular/core';
import {NavController, Modal, Events} from 'ionic-angular';
import {Truncate} from '../../pipes/truncate';
import {AnnonceSearch} from '../../pipes/AnnonceSearch';
import {AnnonceService, Annonce} from '../../providers/annonce-service/annonce-service';
import {FormBuilder, Validators, AbstractControl, ControlGroup } from '@angular/common';
import {UserService, User} from '../../providers/user-service/user-service';
import {AnnonceDetailPage} from '../annonce-detail/annonce-detail';
import {AnnonceEditPage} from '../annonce-edit/annonce-edit';

/*
  Generated class for the AnnoncesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/annonces/annonces.html',
  pipes: [Truncate, AnnonceSearch]
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

    constructor(public nav: NavController, public formBuilder: FormBuilder, public annonceService: AnnonceService, public userService: UserService, private events: Events) {
        this.action = this.segment;

        this.events.subscribe('annonce:updated', () => {
            this.refreshList();
        });

        this.refreshList();
    }

    public refreshList() {

        this.annonceService.getAll().then(a => {
            this.annonces  = a.docs;
        }); 

        this.favorites  = JSON.parse(window.localStorage.getItem("annoncesFavorites")); 
        if (this.favorites==null) {
            this.favorites = []
        }
    }

    public add() {
        this.nav.push(AnnonceEditPage);
    }

    public cancel() {
        this.action = this.segment;
    }

   

    public edit(annonce: Annonce) 
    {
         this.nav.push(AnnonceEditPage, annonce);
         return;
        // if (annonce.userId == this.userService.user.uid) 
        // {
        //    this.nav.push(AnnonceEditPage, annonce);
        // }
        // else
        // {
        //     this.nav.push(AnnonceDetailPage, annonce);
        // }
    }
 
    public delete(annonce : Annonce)
    {
         this.annonces.remove(annonce);
    }
    
    public updateListMode()
    {
         this.action = this.segment;
    }
    
    public onQuery($event)
    {
        console.log("event", $event);
        this.annonceService.query($event.value).then(result=>{
            this.annonces=result.docs;
        })
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
                                                    return obj._id !== annonce._id;
                                                });
        window.localStorage.setItem("annoncesFavorites", JSON.stringify(this.favorites));
    }

    public isInFavorite(annonce : Annonce)
    {
        let result= this.favorites.filter(function( obj ) {
                                                    return obj._id === annonce._id;
                                                });
        return result.length>0;
    }

    public isMine(annonce: Annonce)
    {
        return true;
        //return annonce.userId == this.userService.user.uid;
    }
    
}
