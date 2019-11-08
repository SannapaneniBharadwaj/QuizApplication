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

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private helperService: HelperService) { }
    user:Object;
    userName:string;

  ngOnInit() {
    // this.authService.getProfile().subscribe(profile => {
    //   this.user = profile.user;
    // },
    //  err => {
    //    console.log(err);
    //    return false;
    //  });
    this.helperService.loggedUser.subscribe(data=>
      {
        this.userName=data;
      })
      console.log('username is' + this.userName);
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success', timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }
}
