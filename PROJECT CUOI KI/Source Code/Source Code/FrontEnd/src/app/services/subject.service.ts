import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Subjects } from '../models/subject';
import { RootObject } from '../models/root-object';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private apiService: ApiService) {}
  list(): Observable<RootObject<[Subjects]>> {
    return this.apiService.get<RootObject<[Subjects]>>(this.apiService.apiUrl.subject);
  }

  get(id): Observable<RootObject<Subjects>> {
    return this.apiService.get<RootObject<Subjects>>(`${this.apiService.apiUrl.subject}/${id}`);
  }

  save(data: Subjects): Observable<RootObject<Subjects>> {
    if (data.id === 0) {
      return this.apiService.post<RootObject<Subjects>>(this.apiService.apiUrl.subject, data);
    } else {
      return this.apiService.put<RootObject<Subjects>>(`${this.apiService.apiUrl.subject}/${data.id}`, data);
    }
  }
  delete(id): Observable<RootObject<Subjects>> {
    return this.apiService.delete<RootObject<Subjects>>(`${this.apiService.apiUrl.subject}/${id}`);
  }
  listSubjectsByClass(id: string): Observable<RootObject<[Subjects]>> {
    return this.apiService.get<RootObject<[Subjects]>>(`${this.apiService.apiUrl.subject}/getSubjectsByClass/${id}`);
  }
  getByType(id, page: Page): Observable<RootObject<[Subjects]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObject<[Subjects]>>(`${this.apiService.apiUrl.getByType}/${id}?${queryString}`);
  }
}
