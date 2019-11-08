import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
//import { NavbarService } from '../services/navbar.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: []
})
export class QuizComponent implements OnInit {
  //attempted = 10;
  lastPage=false;
  nextButton=true;
  prevButton=true;
  score = 0;
  wrong = 0;
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  username:string;
  quizName: string; 
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  constructor(private quizService: QuizService,private helperService:HelperService,private location: LocationStrategy) 
  {
    //added to disable browser back button
    history.pushState(null, null, window.location.href);  
      this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
      }); 
   }

  ngOnInit() {

    this.quizes = this.quizService.getAll();
    //this.quizName = this.quizes[0].id;
    this.helperService.quizNameObs.subscribe(data=>{
      this.quizName = data;
    })
    console.log("Quiz Name is "+this.quizName);
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
      if(index==9)
      {
        this.lastPage=true;
        this.nextButton=false;
      }
      else
      {
        this.nextButton=true;
        this.lastPage=false;
      }
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));
    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);

    if (answers.length == 10){
      this.mode = 'result';
      for (const key in this.quiz.questions) {
      if (this.quiz.questions.hasOwnProperty(key)) {
      const element = this.quiz.questions[key];
      for (const iterator of element.options) {
      if(iterator.selected && iterator.isAnswer){
      this.score++;
      }
      }
      
      }
      }
      
      console.log('correct:', this.score, 'Incorrect:', answers.length-this.score);
      this.wrong = answers.length-this.score;
      }
  }
}