import {Injectable, Inject, Component} from '@angular/core';
import {Storage, SqlStorage, LocalStorage} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as PouchDB from 'pouchdb';

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
    this.provider   = provider;
  }
}

@Injectable()
export class UserService {
 public storage;
 public user : User;
 public superlogin;

  constructor() {
     this.superlogin = require("superlogin-client").default;

     var config = {
        // The base URL for the SuperLogin routes with leading and trailing slashes (defaults to '/auth/') 
        baseUrl: 'http://localhost:3000/auth/',
        // A list of API endpoints to automatically add the Authorization header to 
        // By default the host the browser is pointed to will be added automatically 
        //endpoints: ['api.example.com'],
        // Set this to true if you do not want the URL bar host automatically added to the list 
        noDefaultEndpoint: false,
        // Where to save your session token: localStorage ('local') or sessionStorage ('session'), default: 'local' 
        storage: 'local',
        // The authentication providers that are supported by your SuperLogin host 
        providers: ['facebook', 'twitter', 'local'],
        // Sets when to check if the session is expired. 'stateChange', 'startup' or nothing. 
        // 'stateChange' checks every time $stateChangeStart or $routeChangeStart is fired 
        // 'startup' checks just on app startup. If this is blank it will never check. 
        checkExpired: 'stateChange',
        // A float that determines the percentage of a session duration, after which SuperLogin will automatically refresh the 
        // token. For example if a token was issued at 1pm and expires at 2pm, and the threshold is 0.5, the token will 
        // automatically refresh after 1:30pm. When authenticated, the token expiration is automatically checked on every 
        // request. You can do this manually by calling superlogin.checkRefresh(). Default: 0.5 
        refreshThreshold: 0.5
      };

    this.superlogin.configure(config);
    if (!this.superlogin.authenticated()) {
      var credentials = JSON.parse(window.localStorage.getItem("credentials"));
      if ( credentials != null ) {
        this.login(credentials);
      }
    }
  }
  
  public IsAuthorized(){
    //  if (this.user == null) {

    //   this.user = JSON.parse(window.localStorage.getItem("user"));

    //   //Si un user est trouvé connecté il faut le connecter a firebase
    //   if (this.user!=null && this.user.isLogedIn) {
    //     this.login(this.user);
    //   }
    //  }

    // return this.user!=null && this.user.isLogedIn;

    return this.superlogin.authenticated();
  }

  // Get all notes of our DB
  public get(uid:string) {

    // var result = this.storage.query('SELECT * FROM user where id='+id)

    // return result;
  }

  public create(user: User)
  {
    return this.superlogin.create(user);
  }

   // Save a new note to the DB
  public saveOrUpdate(user: User) {

  }
 

// Remove a not with a given ID
  public delete(user: User) {
    
  }

  public login(user : User)
  {
    var credentials = {username:user.email, password:user.password};
    return this.superlogin.login(credentials);
  }

  public register(user : User)
  {
     let credentials = {
            name: user.name,
            username: user.name,
            email: user.email,
            password: user.password,
            confirmPassword: user.password
        };
    return this.superlogin.register(credentials);
  }

  public logout()
  {
    return this.superlogin.logout();
  }

  public getSession()
  {
    return this.superlogin.getSession();
  }

}

