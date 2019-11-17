import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObject } from '../models/root-object';
import {Option } from '../models/option';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(private apiService: ApiService) { }
  list(page: Page): Observable<RootObject<[Option]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObject<[Option]>>(`${this.apiService.apiUrl.option}?${queryString}`);
  }

  getByType(id, page: Page): Observable<RootObject<[Option]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObject<[Option]>>(`${this.apiService.apiUrl.option}/${id}?${queryString}`);
  }

  get(id): Observable<RootObject<Option>> {
    return this.apiService.get<RootObject<Option>>(`${this.apiService.apiUrl.option}/${id}`);
  }

  post(aOption: Option): Observable<RootObject<Option>> {
    return this.apiService.post<RootObject<Option>>(this.apiService.apiUrl.option, aOption);
  }

  put(id: number, aOption: Option):Observable<RootObject<Option>> {
    return this.apiService.put<RootObject<Option>>(`${this.apiService.apiUrl.option}/${id}`, aOption);
  }

  delete(id): Observable<RootObject<Option>> {
    return this.apiService.delete<RootObject<Option>>(`${this.apiService.apiUrl.option}/${id}`);
  }

  save(item: Option): Observable<RootObject<Option>>  {
    if(item.id === 0) {
      return this.apiService.post<RootObject<Option>>(this.apiService.apiUrl.option, item);
    }
    else {
      return this.apiService.put<RootObject<Option>>(`${this.apiService.apiUrl.option}/${item.id}`, item);
    }
  }
  listByQuestion(id: number): Observable<RootObject<[Option]>> {
    return this.apiService.get<RootObject<[Option]>>(`${this.apiService.apiUrl.option}/getByQuestion/${id}`);
  }
}
