import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiFeedbackService {
  private apiUrl = 'https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": `Bearer <your-api-key-here>`,
  });

  constructor(private http: HttpClient) {}

  polishMessage(message: string): Observable<string> {
    const body = { inputs: message };
    return this.http.post<any>(this.apiUrl, body, { headers: this.headers }).pipe(
      map((response: any) => {
        // GPT2 and similar models usually return an array of text completions
        const polished = response?.[0]?.generated_text || message;

        console.log(polished.trim());

        return polished.trim();
      })
    );
  }
}
