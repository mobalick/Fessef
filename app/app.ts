import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {InfoPage} from './pages/info/info';
import {AnnoncesPage} from './pages/annonces/annonces';
import {AgendaPage} from './pages/agenda/agenda';
import {LoginPage} from './pages/login/login';
import { FIREBASE_PROVIDERS, defaultFirebase, FirebaseAuth, firebaseAuthConfig, AuthMethods, AuthProviders} from 'angularfire2';
import {UserService, User} from './providers/user-service/user-service';
import {NotificationService} from './providers/notification-service/notification-service';

@Component({
  template: `
    <ion-menu [content]="content">
      <ion-toolbar>
        <ion-title>Fessef</ion-title>
      </ion-toolbar>
      <ion-content>
        <ion-list>
          <button ion-item (click)="openPage(homePage)">
            <ion-icon name="home"></ion-icon>
            Home
          </button>

          <button ion-item (click)="openPage(infoPage)">
            <ion-icon name="information-circle"></ion-icon>
            Info
          </button>

          <button ion-item (click)="openPage(annoncesPage)">
            <ion-icon name="megaphone"></ion-icon>
            Annonces
          </button>
          
          <button ion-item (click)="openPage(agendaPage)">
            <ion-icon name="calendar"></ion-icon>
            Agenda
          </button>

          <button ion-item (click)="openPage(loginPage)">
            <ion-icon name="contact"></ion-icon>
            Deconnection
          </button>

        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-nav id="nav" #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = this.userService.IsAuthorized()? HomePage : LoginPage;

  private homePage      = HomePage;
  private infoPage      = InfoPage;
  private annoncesPage  = AnnoncesPage;
  private agendaPage    = AgendaPage;
  private loginPage     = LoginPage;


  constructor(platform: Platform, private menu: MenuController, private userService:UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the nav controller to have just this page
    // we wouldn't want the back button to show in this scenario
    this.rootPage = page;

    // close the menu when clicking a link from the menu
    this.menu.close();
  }
}

ionicBootstrap(MyApp, [UserService, FIREBASE_PROVIDERS,NotificationService,  
                                                                      defaultFirebase({
                                                                          apiKey: "AIzaSyDKwqN0kP3YjW_meRkB04PWzQy8IGdG3iM",
                                                                          authDomain: "fessef-9386f.firebaseapp.com",
                                                                          databaseURL: "https://fessef-9386f.firebaseio.com",
                                                                          storageBucket: "fessef-9386f.appspot.com",
                                                                        }),
                                                                      firebaseAuthConfig({
                                                                        provider: AuthProviders.Password,
                                                                        method: AuthMethods.Password
                                                                      })
                       
                      ]);
