import {Injectable}                         from '@angular/core';
import {Storage, SqlStorage, LocalStorage, Events}  from 'ionic-angular';
import {Http}                               from '@angular/http';
import 'rxjs/add/operator/map';
import {NotificationService}                from '../../providers/notification-service/notification-service';
import {UserService}                        from '../user-service/user-service';
import * as PouchDB                         from 'pouchdb';

export class Annonce {
  title: string;
  type:string;  
  description: string;
  _id: String;
  _rev: string;
  userId:string;
  creationDate: Date;
  modificationDate:Date;
  userMail:string;
  className="Annonce";
  constructor(id:string, type: string, title: string, description: string,userId:string , creationDate: Date, modificationDate:Date, userMail:string, rev:string) {
    this.title            = title;
    this.type             = type;
    this.description      = description;
    this._id              = id;
    this.userId           = userId;
    this.userMail         = userMail;
    this.creationDate     = creationDate;
    this.modificationDate = modificationDate;
    this._rev             = rev;
  }
}


@Injectable()
export class AnnonceService {
 public storage;
 data: any;
  db: any;
  remote: any;
  constructor(public userService: UserService, private events: Events) {
    this.db = new PouchDB('fessef');

    PouchDB.plugin(require('pouchdb-find'));
    
    this.db.createIndex({
      index: {
        fields: ['className','title','type', 'description']
      }
    }).then(function (result) {
      // yo, a result
      console.log("success",result);
      
    }).catch(function (err) {
      // ouch, an error
      console.log("error",err);

    });

    this.remote = "http://localhost:5984/fessefdb_main"//userService.getSession().userDBs.fessefdb;

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);

    console.log(this.db);
  }
  
  public get(id: string) {
   return  this.db.find({
      selector: { name: 'Annonce' },
      fields: ['_id', id],
      sort: ['name']
    });
  }

   public getAll() {
    return this.db.find({selector:{"className": "Annonce"}});
  }

   // Save a new note to the DB
   public saveOrUpdate(annonce: Annonce) {
     annonce.className = "Annonce";
     if (annonce._id == null) {
        annonce._id = new Date().toISOString();
        
     }

     let that = this;
     this.db.put(annonce).then(function (response) {
          console.log("create ok", response);
          that.events.publish("annonce:updated");
        }).catch(function (err) {
          console.log(err);
        });
  }
 

// Remove a annonce with a given ID
  public delete(annonce: Annonce) {
   
  }




}

