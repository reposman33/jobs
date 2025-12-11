import { Component, inject, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-sollicitatie',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
  ],
  templateUrl: './add-sollicitatie.html',
  styleUrls: ['./add-sollicitatie.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSollicitatieComponent implements OnInit {
  protected form!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    this.form = this.fb.group({
      datum: ['', Validators.required],
      bedrijf: ['', Validators.required],
      functie: ['', Validators.required],
      sluitingsdatum: ['', Validators.required],
      sollicitatie: ['', Validators.required],
      status: ['pending', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      // TODO: Implement submission logic (e.g., add to datasource)
      this.form.reset({ status: 'pending' });
    }
  }

  onCancel(): void {
    this.form.reset({ status: 'pending' });
  }

    activateRoute(route: string): void {
    this.router.navigate([route]);
  }

}