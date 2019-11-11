import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    //console.log(url)
    return this.http.get('http://localhost:3000/quizdata/'+url);
  }

  getAll() {
    return [
      { id: 'data/html.json', name: 'HTML' },
      { id: 'data/java.json', name: 'JAVA' },
      { id: 'data/general.json', name: 'General' },
      { id: 'data/javascript.json', name: 'JavaScript' }
    ];
  }

  /*
  getScore(url,answers){
    return this.http.get(url,answers);
  }
  */

}
