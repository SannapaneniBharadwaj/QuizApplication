import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {HelperService} from '../services/helper.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private authService:AuthService,private helperService:HelperService, private router:Router){

  }

  canActivate() {
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // canActivateQuiz() {
  //   if(this.helperService.isQuizSet) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/home']);
  //     return false;
  //   }
  // }
}
