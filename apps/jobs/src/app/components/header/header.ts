import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, CommonModule, DatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Header {
  protected authService = inject(AuthService);
  protected lastLogin$ = this.authService.lastLogin$;

  signOut() {
    this.authService.signOut();
  }
}
