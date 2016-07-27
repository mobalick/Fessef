import {Injectable} from '@angular/core';
import {Storage, SqlStorage, LocalStorage} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {NotificationService} from '../../providers/notification-service/notification-service';


export class Annonce {
  title: string;
  type:string;  
  description: string;
  id: number;
  userId:string;
  creationDate: Date;
  modificationDate:Date;
  userMail:string;
  $key : string;
  constructor(id:number, type: string, title: string, description: string,userId:string , creationDate: Date, modificationDate:Date, userMail:string, $key : string) {
    this.title = title;
    this.type = type;
    this.description = description;
    this.id = id;
    this.userId=userId;
    this.userMail=userMail;
    this.creationDate=creationDate;
    this.modificationDate=modificationDate;
    this.$key=$key;
  }
}


@Injectable()
export class AnnonceService {
 public storage;

  constructor() {
     
  }
  
  // Get all notes of our DB
  public get(id:Number) {
    

  }

   public getAll() {
    
  }

   // Save a new note to the DB
  public saveOrUpdate(annonce: Annonce) {
   
  }
 

// Remove a annonce with a given ID
  public delete(annonce: Annonce) {
   
  }




}

