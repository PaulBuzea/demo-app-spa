import { Component } from '@angular/core';
import {Header} from '../header/header';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AbsenceService} from '../../services/absence.service';
import {AiFeedbackService} from '../../services/ai-feedback.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    Header,
    ReactiveFormsModule
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.scss'
})
export class Employee {
  absenceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private absenceService: AbsenceService,
    private aiFeedback: AiFeedbackService
  ) {
    this.absenceForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
      comments: [''],
    });
  }

  onSubmit() {
    if (this.absenceForm.valid) {
      this.absenceService.submitAbsence(this.absenceForm.value).subscribe({
        next: (response) => {
          alert('Absence request submitted successfully!');
          this.absenceForm.reset();
        },
        error: (error) => {
          alert('Error submitting absence request. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
      this.markFormGroupTouched(this.absenceForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}
