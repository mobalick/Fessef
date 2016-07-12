import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
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
     this.storage = new Storage(SqlStorage);
     this.storage.query('CREATE TABLE IF NOT EXISTS annonce (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, title TEXT, description TEXT,userId INTEGER, userMail TEXT, creationDate DATE, modificationDate DATE)');

  }
  
  // Get all notes of our DB
  public get(id:Number) {
    var result = this.storage.query('SELECT * FROM annonce where id='+id)

    return result;
  }

   public getAll() {
    var result = this.storage.query('SELECT * FROM annonce')

    return result;
  }

   // Save a new note to the DB
  public save(annonce: Annonce) {
    if (annonce.id>0) {
      return this.update(annonce);
    }else{
      let sql = 'INSERT INTO annonce (type, title, description, userId,userMail,creationDate,modificationDate) VALUES (?,?,?,?,?,?,?)';
      var result = this.storage.query(sql, [annonce.type, annonce.title, annonce.description, annonce.userId, annonce.userMail, new Date() , annonce.modificationDate]);
      return result;
    }
  }
 
  // Update an existing note with a given ID
  public update(annonce: Annonce) {
      let sql = 'UPDATE annonce SET title = \"' + annonce.title + '\", type = \"' + annonce.type +'\", description = \"' + annonce.description 
                              +'\", userId = \"' +annonce.userId+'\", userMail = \"'+annonce.userMail+'\", creationDate = \"'+annonce.creationDate+'\", modificationDate = \"'+new Date()   
                              +'\" WHERE id = \"' + annonce.id + '\"';
     this.storage.query(sql);
  }

// Remove a annonce with a given ID
  public delete(annonce: Annonce) {
    let sql = 'DELETE FROM annonce WHERE id = \"' + annonce.id + '\"';
    this.storage.query(sql);
  }




}

