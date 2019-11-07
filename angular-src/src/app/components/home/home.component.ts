import { Component, OnInit } from '@angular/core';
import { QuizService } from 'app/services/quiz.service';

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

  constructor(private quizService: QuizService) { }

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
    console.log("Going to Quiz");
    // console.log("Going to Quiz "+ this.quizName);
    // this.helperService.setQuizName(this.quizName)
    // if(this.quizName!='None'){
    //   this.router.navigate(['./quiz']);
    }

}
