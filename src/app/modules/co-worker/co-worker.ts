import {Component, OnInit} from '@angular/core';
import {Header} from '../header/header';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AbsenceService} from '../../services/absence.service';
import {AiFeedbackService} from '../../services/ai-feedback.service';

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
    this.absenceService.getAllAbsences()
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
    const feedback = this.feedbackText[rowId];

    if (feedback !== '') {
      this.showPolishedFeedback(feedback);
    }

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

