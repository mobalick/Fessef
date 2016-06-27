import {Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, Validators, AbstractControl, ControlGroup } from '@angular/common';
import {UserService} from '../../providers/user-service/user-service';
import {HomePage} from '../home/home';
import {User} from '../../providers/user-service/user-service';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers : [UserService]
})
export class LoginPage {
  public authType;
  public isAuthorized;
  public loginForm;
  public signupForm;
  public user : User;
  public submitAttempt;
  public isLoginIncorrect;
  constructor(public nav: NavController, public userService : UserService, public formBuilder : FormBuilder) {
    
    this.authType = 'signup';  
    this.isLoginIncorrect = false;
    this.submitAttempt=false;

    this.userService.get(1).then(users => {

      this.user = users === '' ? null : users.res.rows[0];
      this.isAuthorized = this.user != null && this.user.isLogedIn+''=='true';
     
    });

   


    this.loginForm = formBuilder.group({
      'mail': ['', Validators.required],
      'password': ['', Validators.required]
    });

     this.signupForm = formBuilder.group({
      'name'    : ['', Validators.required],
      'lastName': ['', Validators.required],
      'sex'     : ['m', Validators.required],
      'mail'    : ['', Validators.required],
      'school'  : ['', Validators.required],
      'city'    : ['', Validators.required],
      'dob'     : ['', Validators.required],
      'password': ['', Validators.required],
    });
    
    
  }

  public login(login)
  {
    console.log("call from login");

     this.userService.get(1).then(users => {
      this.user = users === '' ? null : users.res.rows[0];
      if (this.user!=null) {
        if (this.user.mail==login.mail && this.user.password==login.password) {
            this.user.isLogedIn   = true;
            this.isAuthorized     = true;
            this.userService.update(this.user);
            this.nav.push(HomePage);
        }else{
            this.isLoginIncorrect = true;
        }
      }
    });

  }

  public logout()
  {

    console.log("call from logout");

    this.userService.get(1).then(users => {
      this.user = users === '' ? null : users.res.rows[0];
      if (this.user!=null) {
        this.user.isLogedIn=false;
        this.isAuthorized=false;
        this.authType = 'login'; 
        this.userService.update(this.user);
      }
    });
  }

  public signup(user:User)
  {
    this.submitAttempt = true;

    if (this.signupForm.valid) {
      user.isLogedIn=false;
     // user.dob=new Date(user.dob);
      this.userService.save(user);
      this.authType = 'login';
    }
    else
    {
      
    }
    
    console.log(user.name);

  }

}
