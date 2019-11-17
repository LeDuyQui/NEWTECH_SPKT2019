import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { TestDetail } from '../models/test-detail';
import { RootObject } from '../models/root-object';

@Injectable({
  providedIn: 'root'
})
export class TestDetailService {

  constructor(private apiService: ApiService) {}
  list(): Observable<RootObject<[TestDetail]>> {
    return this.apiService.get<RootObject<[TestDetail]>>(this.apiService.apiUrl.testDetail);
  }

  get(id): Observable<RootObject<TestDetail>> {
    return this.apiService.get<RootObject<TestDetail>>(`${this.apiService.apiUrl.testDetail}/${id}`);
  }

  save(data: TestDetail): Observable<RootObject<TestDetail>> {
    if (data.id === 0) {
      return this.apiService.post<RootObject<TestDetail>>(this.apiService.apiUrl.testDetail, data);
    } else {
      return this.apiService.put<RootObject<TestDetail>>(`${this.apiService.apiUrl.testDetail}/${data.id}`, data);
    }
  }
  delete(id): Observable<RootObject<TestDetail>> {
    return this.apiService.delete<RootObject<TestDetail>>(`${this.apiService.apiUrl.testDetail}/${id}`);
  }
  listByTest(id: string): Observable<RootObject<[TestDetail]>> {
    return this.apiService.get<RootObject<[TestDetail]>>(`${this.apiService.apiUrl.testDetail}/getByTest/${id}`);
  }
}
