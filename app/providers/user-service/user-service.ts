import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';



export class User {
  name: string;
  lastName:string;  
  sex: string;
  mail: string;
  city: string;
  school: string;
  dob: Date;
  isLogedIn: boolean;
  password : string;
  id: number;

  constructor(name: string, sex: string, password: string,
              mail: string, city: string, lastName:string,
              school: string,dob: Date, isLogedIn:boolean, id: number) {
    this.name = name;
    this.lastName = lastName;
    this.sex = sex;
    this.mail = mail;
    this.city = city;
    this.dob = dob;
    this.school = school;  
    this.isLogedIn = isLogedIn;  
    this.password = password;  
    this.id = id;
  }
}


@Injectable()
export class UserService {
 public storage;

  constructor() {
     this.storage = new Storage(SqlStorage);
     this.storage.query('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, lastName TEXT, sex TEXT, mail TEXT, city TEXT, school TEXT, dob DATE, isLogedIn boolean, password TEXT)');

  }
  
  public IsAuthorized(){
    
    return false;
  }

  // Get all notes of our DB
  public get(id:Number) {
    var result = this.storage.query('SELECT * FROM user where id='+id)

    return result;
  }

   // Save a new note to the DB
  public save(user: User) {
    let sql = 'INSERT INTO user (name, lastName, sex, mail, city, dob, school, isLogedIn, password) VALUES (?,?,?,?,?,?,?,?,?)';
    var result = this.storage.query(sql, [user.name, user.lastName, user.sex, user.mail, user.city, user.dob, user.school, user.isLogedIn, user.password]);
    return result;
  }
 
  // Update an existing note with a given ID
  public update(user: User) {
     let sql = 'UPDATE user SET name = \"' + user.name + '\", lastName = \"' + user.lastName +'\", school = \"' + user.school + 
                                      '", sex = \"' + user.sex + '\", mail = \"' + user.mail +'\", isLogedIn = \"' + user.isLogedIn +
                                      '", city = \"' + user.city + '\", dob = \"' + user.dob +'\", password = \"' + user.password +'\" WHERE id = \"' + user.id + '\"';
    this.storage.query(sql);
  }

// Remoe a not with a given ID
  public delete(user: User) {
    let sql = 'DELETE FROM user WHERE id = \"' + user.id + '\"';
    this.storage.query(sql);
  }




}

