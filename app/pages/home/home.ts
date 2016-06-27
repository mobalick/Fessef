import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {UserService} from '../../providers/user-service/user-service';
import {User} from '../../providers/user-service/user-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers:[UserService]
})
export class HomePage {
  public user:User;
  constructor(private _navController: NavController, public userService:UserService) {
    
    
    
    this.userService.get(1).then(users => {

      this.user = users === '' ? null : users.res.rows[0];
      
      console.log(this.user);

      _navController.user=this.user;


      if (this.user==null || this.user.isLogedIn+''=='false') {
        this._navController.push(LoginPage);
      }
     
    });
  }

  /*
    pushPage(){
      this._navController.push(SomeImportedPage, { userId: "12345"});
    }
  */
}
