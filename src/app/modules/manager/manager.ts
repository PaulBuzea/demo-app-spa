import {Component, OnInit} from '@angular/core';
import {Header} from '../header/header';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AbsenceService} from '../../services/absence.service';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    Header,
    CommonModule,
    FormsModule
  ],
  templateUrl: './manager.html',
  styleUrl: './manager.scss'
})
export class Manager implements OnInit {
  rowData: any[] = [];
  loading = true;
  editableRowId: number | null = null;

  constructor(private absenceService: AbsenceService) {}

  ngOnInit() {
    this.fetchAbsences();
  }

  fetchAbsences() {
    this.loading = true;
    this.absenceService.getAllAbsencesForManager()
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

  startEditing(id: number) {
    this.editableRowId = id;
  }

  saveRow(row: any) {
    this.absenceService.updateAbsenceForManager(row).subscribe({
      next: (response) => {
        console.log('Row saved successfully:', response);
        this.editableRowId = null;

        const index = this.rowData.findIndex(r => r.id === row.id);
        if (index !== -1) {
          this.rowData[index] = response;
        }

        // Optional: Show success message
        alert('Changes saved successfully!');
      },
      error: (error) => {
        console.error('Error saving row:', error);
        alert('Failed to save changes. Please try again.');

        // Reload data to revert changes
        this.fetchAbsences();
        this.editableRowId = null;
      }
    });
  }

  cancelEditing() {
    this.editableRowId = null;
  }
}
