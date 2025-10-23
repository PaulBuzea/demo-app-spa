import {Component, OnInit} from '@angular/core';
import {Header} from '../header/header';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AbsenceService} from '../../services/absence.service';
import {AiFeedbackService} from '../../services/ai-feedback.service';
import {catchError, of, switchMap} from 'rxjs';

@Component({
  selector: 'app-co-worker',
  standalone: true,
  imports: [
    Header,
    CommonModule,
    FormsModule
  ],
  templateUrl: './co-worker.html',
  styleUrl: './co-worker.scss'
})
export class CoWorker implements OnInit {
  rowData: any[] = [];
  loading = true;

  // Track which row is showing feedback input
  feedbackRowId: number | null = null;
  feedbackText: { [key: number]: string } = {};

  constructor(
    private absenceService: AbsenceService,
    private aiFeedback: AiFeedbackService
  ) {}

  ngOnInit() {
    this.fetchAbsences();
  }

  fetchAbsences() {
    this.loading = true;
    this.absenceService.getAllAbsencesForCoWorker()
      .subscribe({
        next: (data) => {
          this.rowData = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching absences:', err);
          this.loading = false;
        }
      });
  }

  openFeedback(rowId: number): void {
    this.feedbackRowId = rowId;
    // Initialize feedback text if not exists
    if (!this.feedbackText[rowId]) {
      this.feedbackText[rowId] = '';
    }
  }

  closeFeedback(): void {
    this.feedbackRowId = null;
  }

  submitFeedback(rowId: number): void {
    const feedbackText = this.feedbackText[rowId];
    if (!feedbackText.trim()) return; // Skip if empty

    this.absenceService.getAbsenceById(rowId).pipe(
      switchMap((absence) =>
        this.aiFeedback.polishMessage(feedbackText).pipe(
          catchError((error) => {
            console.error('Polishing failed:', error);
            return of(feedbackText); // Fallback to original feedback
          }),
          switchMap((polishedFeedback) => {
            absence.feedback = polishedFeedback;
            return this.absenceService.updateAbsenceForCoWorker(absence);
          })
        )
      ),
      catchError((error) => {
        console.error('Error updating absence:', error);
        return of(null); // Gracefully handle errors
      })
    ).subscribe({
      next: (response) => {
        this.fetchAbsences(); // Refresh the list
      },
      error: (error) => console.error('Unexpected error:', error)
    });

    this.closeFeedback();
    this.feedbackText[rowId] = '';
  }

  private showPolishedFeedback(message: string) {
    this.aiFeedback.polishMessage(message).subscribe({
      next: (polished) => alert(polished),
      error: (error) => {
        if (error.status === 401) {
          alert("Authentication for HuggingFace is not set-up!...");
        } else {
          alert(message); // fallback for other errors
        }
      }
    });
  }

  isFeedbackOpen(rowId: number): boolean {
    return this.feedbackRowId === rowId;
  }


}

