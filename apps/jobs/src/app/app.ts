import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpeedInsights } from '@vercel/speed-insights';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('sollicitatie');
  speedInsights: SpeedInsights = inject(SpeedInsights)
  
  ngOnInit() {
    this.speedInsights();
  }
  // constructor(private speedInsights: SpeedInsights) {
  //   this.speedInsights();
  // } 
}
