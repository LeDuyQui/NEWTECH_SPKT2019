import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObject } from '../models/root-object';
import {Question } from '../models/question';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private apiService: ApiService) { }
  list(page: Page): Observable<RootObject<[Question]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObject<[Question]>>(`${this.apiService.apiUrl.question}?${queryString}`);
  }

  getByType(id, page: Page): Observable<RootObject<[Question]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObject<[Question]>>(`${this.apiService.apiUrl.question}/${id}?${queryString}`);
  }

  get(id): Observable<RootObject<Question>> {
    return this.apiService.get<RootObject<Question>>(`${this.apiService.apiUrl.question}/${id}`);
  }

  post(aQuestion: Question): Observable<RootObject<Question>> {
    return this.apiService.post<RootObject<Question>>(this.apiService.apiUrl.question, aQuestion);
  }

  put(id: number, aQuestion: Question):Observable<RootObject<Question>> {
    return this.apiService.put<RootObject<Question>>(`${this.apiService.apiUrl.option}/${id}`, aQuestion);
  }

  delete(id): Observable<RootObject<Question>> {
    return this.apiService.delete<RootObject<Question>>(`${this.apiService.apiUrl.question}/${id}`);
  }

  save(item: Question): Observable<RootObject<Question>>  {
    if(item.id === 0) {
      return this.apiService.post<RootObject<Question>>(this.apiService.apiUrl.question, item);
    }
    else {
      return this.apiService.put<RootObject<Question>>(`${this.apiService.apiUrl.question}/${item.id}`, item);
    }
  }
  listBySubject(id: number): Observable<RootObject<[Question]>> {
    return this.apiService.get<RootObject<[Question]>>(`${this.apiService.apiUrl.question}/getBySubject/${id}`);
  }
}
