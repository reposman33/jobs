import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private authService = inject(AuthService)
  private fb = inject(FormBuilder)
  protected router = inject(Router)

  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.email]],
  });

  async loginWithGoogle() {
    await this.authService.signInWithGoogle();
    this.router.navigateByUrl('/sollicitaties');
  }

  async registerWithEmail() {
    const { email, password } = this.form.value;
    if (email && password) {
      this.authService.registerWithEmail(email, password).then(() => {
        this.router.navigateByUrl('/sollicitaties');
      }
      );
    };
   };

  loginWithEmailAndPassword() {
    const { email, password } = this.form.value;
    if (email && password) {
      this.authService.signInWithEmail(email, password).then(() => {
        this.router.navigateByUrl('/sollicitaties');
      });
    }
   }
}
