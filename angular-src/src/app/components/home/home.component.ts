import { Component, OnInit } from '@angular/core';
import { QuizService } from 'app/services/quiz.service';
import { HelperService } from 'app/services/helper.service';
import { Router } from '@angular/router';
import { equalParamsAndUrlSegments } from '@angular/router/src/router_state';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quizes: any[];
  quizName: string;
  quizId: string;
  userName:string;
  errMsg:string;

  constructor(private quizService: QuizService,private helperService: HelperService,private router: Router,private location: LocationStrategy) {
    //added to disable browser back button
    history.pushState(null, null, window.location.href);  
      this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
      }); 
   }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = 'None';
  }

  select(quizName:string){
    //this.quizId = quizId;
    this.quizName = quizName;
    //console.log("Selected quizId" + quizId);
    console.log("Selected Quiz Name "+quizName);
    //this.helperService.setQuizName(quizName);
  }

  goToQuiz() {
    console.log("Going to Quiz "+ this.quizName);
    console.log("Yes")
    this.helperService.setQuizName(this.quizName)
    if(this.quizName!='None'){
      this.router.navigate(['quiz']);
    }
    else
    {
      this.errMsg="Please select quiz";
    }
    }
}
