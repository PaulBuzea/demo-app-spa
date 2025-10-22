import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    const { username, password } = this.loginForm.value;
    const role = this.authenticate(username, password);
    if (role) {
      localStorage.setItem('userRole', role);
      this.router.navigate([`/${role}`]);
    } else {
      alert('Invalid credentials!');
    }
  }

  // Mock authentication logic
  authenticate(username: string | null | undefined, password: string | null | undefined): string | null {
    // Replace with real authentication logic (e.g., API call)
    const users = [
      { username: 'manager', password: 'manager123', role: 'manager' },
      { username: 'co-worker', password: 'co-worker123', role: 'co-worker' },
      { username: 'employee', password: 'employee123', role: 'employee' },
    ];
    const user = users.find(u => u.username === username && u.password === password);
    return user ? user.role : null;
  }
}
