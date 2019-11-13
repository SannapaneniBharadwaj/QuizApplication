import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HelperService } from 'app/services/helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:Object;
  userName:string;
  username:string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private helperService: HelperService) { }

  ngOnInit() {
    this.helperService.loggedUser.subscribe(data=>
      {
        this.userName=data;
        this.username = data;
      })

      if(this.authService.loggedIn()){
        this.authService.getUser().subscribe(data => {
          this.username = data.username;
        },
         err => {
           console.log(err);
           return false;
         });
         this.userName = this.username;
      }
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success', timeout: 1000
    });
    this.router.navigate(['/login']);
    return false;
  }
}
