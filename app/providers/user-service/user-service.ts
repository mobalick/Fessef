import {Injectable, Inject, Component} from '@angular/core';
import {Storage, SqlStorage, LocalStorage} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FIREBASE_PROVIDERS, defaultFirebase,AngularFire, FirebaseAuth } from 'angularfire2';


export class User {
  name: string;
  lastName:string;  
  sex: string;
  email: string;
  city: string;
  school: string;
  dob: Date;
  isLogedIn: boolean;
  password : string;
  id: number;
  uid : string;
  provider : string
  constructor(name: string, sex: string, password: string,
              mail: string, city: string, lastName:string,
              school: string,dob: Date, isLogedIn:boolean, id: number, 
              uid:string, provider : string) {
    this.name       = name;
    this.lastName   = lastName;
    this.sex        = sex;
    this.email       = mail;
    this.city       = city;
    this.dob        = dob;
    this.school     = school;  
    this.isLogedIn  = isLogedIn;  
    this.password   = password;  
    this.id         = id;
    this.uid        = uid;
    this.provider   = provider;
  }
}

@Injectable()
export class UserService {
 public storage;
 public user : User;
 
  constructor(public auth : FirebaseAuth, public af : AngularFire) {
     this.storage = new Storage(LocalStorage);
     //this.storage.query('CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, lastName TEXT, sex TEXT, email TEXT, city TEXT, school TEXT, dob DATE, isLogedIn boolean, password TEXT)');

  }
  
  public IsAuthorized(){
     if (this.user == null) {
      //   var str = this.storage.get('user').then((value) => {
      //               return value;
      //             });

      //  this.user = JSON.parse(str);
     }

    return this.user!=null && this.user.isLogedIn;
  }

  // Get all notes of our DB
  public get(uid:string) {
      return this.af.database.object('/user/'+uid).first();

    // var result = this.storage.query('SELECT * FROM user where id='+id)

    // return result;
  }

  public create(user: User)
  {
     return this.auth.createUser(user)
  }

   // Save a new note to the DB
  public save(user: User) {

    const itemObservable = this.af.database.object('/user/'+user.uid);
    itemObservable.set(user);
    this.user = user;
    //  let sql = 'INSERT INTO user (name, lastName, sex, mail, city, dob, school, isLogedIn, password) VALUES (?,?,?,?,?,?,?,?,?)';
    //  var result = this.storage.query(sql, [user.name, user.lastName, user.sex, user.email, user.city, user.dob, user.school, user.isLogedIn, user.password]);
    //  return result;
  }
 
  // Update an existing note with a given ID
  public update(user: User) {
    
     let sql = 'UPDATE user SET name = \"' + user.name + '\", lastName = \"' + user.lastName +'\", school = \"' + user.school + 
                                      '", sex = \"' + user.sex + '\", email = \"' + user.email +'\", isLogedIn = \"' + user.isLogedIn +
                                      '", city = \"' + user.city + '\", dob = \"' + user.dob +'\", password = \"' + user.password +'\" WHERE id = \"' + user.id + '\"';
    this.storage.query(sql);
  }

// Remoe a not with a given ID
  public delete(user: User) {
    let sql = 'DELETE FROM user WHERE id = \"' + user.id + '\"';
    this.storage.query(sql);
  }


  public login(user : User)
  {
    return this.auth.login(user);
  }

   public logout()
  {
    return this.auth.logout();
  }

}

