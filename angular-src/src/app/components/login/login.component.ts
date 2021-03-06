import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HelperService } from 'app/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private helperService: HelperService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }
console.log("in submit method");
    this.authService.authenticateUser(user).subscribe(data => {
      console.log("inside auth service");
        if(data.success) {
          console.log("inside login  if")
          this.authService.storeUserData(data.token, data.user);
          this.helperService.setUserName(this.username);
          this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 800});
          this.router.navigate(['home']);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 1000});
          this.router.navigate(['login']);
        }
    });
  }

}
