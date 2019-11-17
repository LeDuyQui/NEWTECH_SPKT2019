import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Semester } from '../models/semester';
import { RootObject } from '../models/root-object';
import { Page } from '../models/page';
@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor(private apiService: ApiService) {}
  list(): Observable<RootObject<[Semester]>> {
    return this.apiService.get<RootObject<[Semester]>>(this.apiService.apiUrl.semester);
  }
  getByType(id, page: Page): Observable<RootObject<[Semester]>> {
    const queryString = `p=${page.pageNumber}&s=${page.pageSize}`;
    return this.apiService.get<RootObject<[Semester]>>(`${this.apiService.apiUrl.sgetByType}/${id}?${queryString}`);
  }
  get(id): Observable<RootObject<Semester>> {
    return this.apiService.get<RootObject<Semester>>(`${this.apiService.apiUrl.semester}/${id}`);
  }

  save(data: Semester): Observable<RootObject<Semester>> {
    if (data.id === 0) {
      return this.apiService.post<RootObject<Semester>>(this.apiService.apiUrl.semester, data);
    } else {
      return this.apiService.put<RootObject<Semester>>(`${this.apiService.apiUrl.semester}/${data.id}`, data);
    }
  }
  delete(id): Observable<RootObject<Semester>> {
    return this.apiService.delete<RootObject<Semester>>(`${this.apiService.apiUrl.semester}/${id}`);
  }
  listPupilsByClass(id: string): Observable<RootObject<[Semester]>> {
    return this.apiService.get<RootObject<[Semester]>>(`${this.apiService.apiUrl.semester}/getPupilsByClass/${id}`);
  }
  listClassByStudent(id: string): Observable<RootObject<[Semester]>> {
    return this.apiService.get<RootObject<[Semester]>>(`${this.apiService.apiUrl.semester}/getClassByStudent/${id}`);
  }
}
