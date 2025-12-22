import { Component, inject, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef,LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from '../../services/StorageService';
import { Sollicitatie } from '../../../../models/sollicitatie.interface';
import { Timestamp } from '@angular/fire/firestore';

registerLocaleData(localeNl);
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
  providers: [{provide: LOCALE_ID, useValue: 'nl-NL'}]
})
export class AddSollicitatieComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private datePipe = new DatePipe('nl-NL');
  protected form!: FormGroup;
  private id: string | null = null;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private storageService = inject(StorageService);
  private authService = inject(AuthService)

  ngOnInit(): void {
    this.initializeForm();
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if(id) {
      this.updateForm(id);
    }
  }
  
  initializeForm(sollicitatie: Sollicitatie | null = null): void {
    this.form = this.fb.group({
      datum: [sollicitatie ? this.convertFirestoreTimestamp(sollicitatie.datum) : '', Validators.required],
      bedrijf: [sollicitatie?.bedrijf || '', Validators.required],
      functie: [sollicitatie?.functie || '', Validators.required],
      sluitingsdatum: [sollicitatie ? this.convertFirestoreTimestamp(sollicitatie.sluitingsdatum) : '', Validators.required],
      sollicitatie: [sollicitatie?.sollicitatie || '', Validators.required],
      status: [sollicitatie?.status || 'pending', Validators.required],
    });
 
    this.cdr.markForCheck();
  }

  async updateForm(id: string) {
    this.storageService.getSollicitatieById(id)
    .subscribe(sollicitaties => this.initializeForm(sollicitaties));
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.storageService.addSollicitatie(this.form.value)
      this.activateRoute('sollicitaties')
    }
  }

  onCancel(): void {
    this.form.reset({ status: 'pending' });
  }

  activateRoute(route: string): void {
    this.router.navigate([route]);
  }

  convertFirestoreTimestamp(timestamp: any): string {
    // Cast naar Timestamp
    const firestoreTimestamp = timestamp as Timestamp;
    const date = firestoreTimestamp.toDate();  // Je kunt nu veilig de toDate() methode aanroepen
    // return date.toISOString().split('T')[0];
    return this.datePipe.transform(date, 'yyyy-MM-dd', undefined, 'nl-NL') || '';
  }

}