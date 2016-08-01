import {Component } from '@angular/core';
import {NavController, LocalStorage, Storage} from 'ionic-angular';
import {FormBuilder, Validators, AbstractControl, ControlGroup } from '@angular/common';
import {UserService, User} from '../../providers/user-service/user-service';
import {NotificationService} from '../../providers/notification-service/notification-service';
import {HomePage} from '../home/home';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html'
 })

export class LoginPage {
    public authType;
    public isAuthorized;
    public loginForm;
    public signupForm;
    public user : User;
    public submitAttempt;
    public isLoginIncorrect;
    public storage = new Storage(LocalStorage);

    constructor(public nav: NavController, public userService : UserService, 
                public formBuilder : FormBuilder, public notif : NotificationService ) {
        
        this.authType         = 'login';  
        this.isLoginIncorrect = false;
        this.submitAttempt    = false;

        this.user             = this.userService.user;
        this.isAuthorized     = this.userService.IsAuthorized();
        
        this.loginForm        = formBuilder.group({
            'email'   : ['', Validators.required],
            'password': ['', Validators.required]
        });
    
        this.signupForm      = formBuilder.group({
            'name'    : ['', Validators.required],
            'lastName': ['', Validators.required],
            'sex'     : ['m', Validators.required],
            'email'   : ['', Validators.required],
            'school'  : [''],
            'city'    : [''],
            'dob'     : [''],
            'password': ['', Validators.required],
        });
        
        
    }

    public login(login)
    {
        console.log("call from login");
        
        this.notif.showLoading(this.nav);
        
         this.userService.login(login).then((authData)=>{
            this.notif.closeLoading();
            this.nav.setRoot(HomePage);

            window.localStorage.setItem("credentials", JSON.stringify(login));    

         }).catch((error)=>{
            this.notif.showError(error,this.nav);
            this.isLoginIncorrect   = true;
        })
    }

    public logout()
    {

        console.log("call from logout");
        this.userService.logout();
        this.isAuthorized=false;
        this.authType = 'login'; 
    }

    public signup(user:User)
    {
        this.submitAttempt = true;

        if (this.signupForm.valid) {
        user.isLogedIn=false;

        this.notif.showLoading(this.nav);

         this.userService.register(user).then((authdata)=>{
             console.log("create ok"+authdata);
             this.notif.closeLoading();
             this.authType = 'login';
        
         //Save the object
         user.uid = authdata.uid;
         this.userService.saveOrUpdate(user);


         }).catch((error)=>{
             console.log(error);
             this.notif.showError(error.message,this.nav);
             this.authType = 'signup';
         });
        
        
        }
        else
        {
        
        }
        
        console.log(user.name);

    }

}
