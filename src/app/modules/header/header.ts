import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private router = inject(Router);
  currentRole = localStorage.getItem('userRole') || 'Not logged in';

  switchUser() {
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}
