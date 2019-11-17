import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { RootObject } from '../models/root-object';
import { Test } from '../models/test';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private apiService: ApiService) { }
  list(page: Page): Observable<RootObject<[Test]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObject<[Test]>>(`${this.apiService.apiUrl.test}?${queryString}`);
  }

  getByType(id, page: Page): Observable<RootObject<[Test]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObject<[Test]>>(`${this.apiService.apiUrl.test}/${id}?${queryString}`);
  }

  get(id): Observable<RootObject<Test>> {
    return this.apiService.get<RootObject<Test>>(`${this.apiService.apiUrl.test}/${id}`);
  }

  post(aTest: Test): Observable<RootObject<Test>> {
    return this.apiService.post<RootObject<Test>>(this.apiService.apiUrl.test, aTest);
  }

  put(id: number, aTest: Test):Observable<RootObject<Test>> {
    return this.apiService.put<RootObject<Test>>(`${this.apiService.apiUrl.test}/${id}`, aTest);
  }

  delete(id): Observable<RootObject<Test>> {
    return this.apiService.delete<RootObject<Test>>(`${this.apiService.apiUrl.test}/${id}`);
  }

  save(item: Test): Observable<RootObject<Test>>  {
    if(item.id === 0) {
      return this.apiService.post<RootObject<Test>>(this.apiService.apiUrl.test, item);
    }
    else {
      return this.apiService.put<RootObject<Test>>(`${this.apiService.apiUrl.test}/${item.id}`, item);
    }
  }
  listBySubjectAndStatus(id: string,status: boolean): Observable<RootObject<[Test]>> {
    return this.apiService.get<RootObject<[Test]>>(`${this.apiService.apiUrl.test}/getBySubjectAndStatus/${id}/${status}`);
  }
}
