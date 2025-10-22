import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Login} from './modules/login/login';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('demo-app-spa');
}
