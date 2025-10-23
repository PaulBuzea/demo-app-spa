import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AbsenceManager {
  id: number;
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  reason: string;
  comments?: string;
  feedback?: string;
}

export interface AbsenceCoWorker {
  id: number;
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  feedback?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = 'http://localhost:8080/api/absence';

  constructor(private http: HttpClient) {}

  submitAbsence(absenceData: AbsenceManager): Observable<any> {
    return this.http.post(this.apiUrl, absenceData);
  }

  getAbsenceById(id: number): Observable<AbsenceCoWorker> {
    return this.http.get<AbsenceCoWorker>(`${this.apiUrl}/${id}`);
  }

  getAllAbsencesForManager(): Observable<AbsenceManager[]> {
    return this.http.get<AbsenceManager[]>(`${this.apiUrl}/manager`);
  }

  updateAbsenceForManager(absenceData: AbsenceManager): Observable<AbsenceManager> {
    return this.http.put<AbsenceManager>(`${this.apiUrl}/manager`, absenceData);
  }

  getAllAbsencesForCoWorker(): Observable<AbsenceCoWorker[]> {
    return this.http.get<AbsenceCoWorker[]>(`${this.apiUrl}/co-worker`);
  }

  updateAbsenceForCoWorker(absenceData: AbsenceCoWorker | undefined): Observable<AbsenceCoWorker> {
    return this.http.put<AbsenceCoWorker>(`${this.apiUrl}/co-worker`, absenceData);
  }

}
