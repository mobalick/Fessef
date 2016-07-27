import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {InfoPage} from './pages/info/info';
import {AnnoncesPage} from './pages/annonces/annonces';
import {AgendaPage} from './pages/agenda/agenda';
import {LoginPage} from './pages/login/login';
import {UserService, User} from './providers/user-service/user-service';
import {NotificationService} from './providers/notification-service/notification-service';

@Component({
  template: `
    <ion-menu [content]="content">
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
      <ion-content>
        <ion-list>
          <ion-list-header>
             Navigate
          </ion-list-header>
          
          <button ion-item (click)="openPage(homePage)">
            <ion-icon  item-left name="home"></ion-icon>
            Home
          </button>

          <button ion-item (click)="openPage(infoPage)">
            <ion-icon  item-left name="information-circle"></ion-icon>
            Info
          </button>

          <button ion-item (click)="openPage(annoncesPage)">
            <ion-icon  item-left name="megaphone"></ion-icon>
            Annonces
          </button>
          
          <button ion-item (click)="openPage(agendaPage)">
            <ion-icon  item-left name="calendar"></ion-icon>
            Agenda
          </button>
        </ion-list>
        <ion-list>
          <ion-list-header>
             Account
          </ion-list-header>
          <button ion-item (click)="openPage(loginPage)">
            <ion-icon  item-left name="contact"></ion-icon>
            Deconnection
          </button>

        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-nav id="nav" #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any = this.userService.IsAuthorized()? AnnoncesPage : LoginPage;

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

ionicBootstrap(MyApp, [UserService, NotificationService]);
