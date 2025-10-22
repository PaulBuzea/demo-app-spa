import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AbsenceModel {
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  reason: string;
  comments?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = 'http://localhost:8080/api/absence';

  constructor(private http: HttpClient) {}

  submitAbsence(absenceData: AbsenceModel): Observable<any> {
    return this.http.post(this.apiUrl, absenceData);
  }

  getAllAbsences(): Observable<AbsenceModel[]> {
    return this.http.get<AbsenceModel[]>(this.apiUrl);
  }

  getAbsenceById(id: number): Observable<AbsenceModel> {
    return this.http.get<AbsenceModel>(`${this.apiUrl}/${id}`);
  }

  updateAbsence(id: number, absenceData: AbsenceModel): Observable<AbsenceModel> {
    return this.http.put<AbsenceModel>(`${this.apiUrl}/${id}`, absenceData);
  }

  deleteAbsence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
