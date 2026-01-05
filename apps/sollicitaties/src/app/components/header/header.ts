import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth-service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ AsyncPipe, MatButtonModule, DatePipe ],
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
