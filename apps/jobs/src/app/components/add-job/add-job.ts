import {
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  LOCALE_ID,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { AuthService } from '../../services/auth-service';

registerLocaleData(localeNl);
@Component({
  selector: 'app-add-sollicitatie',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
  ],
  templateUrl: './add-job.html',
  styleUrls: ['./add-job.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: LOCALE_ID, useValue: 'nl-NL' }],
})
export class AddSollicitatieComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private storageService = inject(StorageService);
  private authService = inject(AuthService);
  protected form!: FormGroup;
  protected locatie$: Promise<Pick<Sollicitatie, 'locatie'>[]> =
    this.storageService.getLocaties();

  ngOnInit(): void {
    this.initializeForm();
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.updateForm(id);
    }
  }

  initializeForm(sollicitatie: Sollicitatie | null = null, id = ''): void {
    this.form = this.fb.group({
      datum: [ this.getDate(sollicitatie?.datum),
        [Validators.required],
      ],
      aanvraag: [
        { value: sollicitatie?.aanvraag || '', disabled: false },
        [Validators.required],
      ],
      bedrijf: [
        { value: sollicitatie?.bedrijf || '', disabled: false },
        [Validators.required],
      ],
      locatie: [
        { value: sollicitatie?.locatie || '', disabled: false },
        [Validators.required],
      ],
      motivatie: [
        { value: sollicitatie?.motivatie || '', disabled: false },
        [Validators.required],
      ],
      sluitingsdatum: [
        this.getDate(sollicitatie?.sluitingsdatum),
        [],
      ],
      updates: [sollicitatie?.updates || ''],
      status: [sollicitatie?.status ?? 'pending', [Validators.required]],
      id: [id || ''],
    });

    this.cdr.markForCheck();
  }

  async updateForm(id: string) {
    this.storageService
      .getSollicitatieById(id)
      .subscribe((jobs) => this.initializeForm(jobs, id));
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.form.value.id) {
        // update bestaande sollicitatie
        this.storageService.updateSollicitatie(
          this.form.value.id,
          this.form.value
        );
        this.activateRoute('jobs');
        return;
      }
      // toevoegen nieuwe sollicitatie
      this.form.value.userId = this.authService.userId;
      this.storageService.addSollicitatie(this.form.value);
      this.activateRoute('jobs');
    }
  }

  onCancel(): void {
    this.form.reset({ status: 'pending' });
  }

  activateRoute(route: string): void {
    this.router.navigate([route]);
  }

  private getDate(value: any): Date | null {
    if(value && typeof (value as any).toDate === 'function')
      return value.toDate();
    else {
      return null;
    }
  }
}
