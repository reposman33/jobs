import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatButtonModule, ReactiveFormsModule],
  templateUrl: './registreer.html',
  styleUrl: './registreer.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Registreer {
  private authService = inject(AuthService)
  private router = inject(Router)
  private fb = inject(FormBuilder)

  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.email]],
  });
  
  registerWithEmail() {
      const { email, password } = this.form.value;
      if (email && password) {
         this.authService.registerWithEmail(email, password).then(() => {
            this.router.navigateByUrl('/sollicitaties');
         });
      }
   }
}