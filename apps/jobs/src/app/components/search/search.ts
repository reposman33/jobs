import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './search.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search implements OnInit {
  @Output() search = new EventEmitter<string>();

  private destroyRef = inject(DestroyRef);

  protected hasSearchText = signal(false);

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  ngOnInit(): void {
    const control = this.searchForm.get('search');
    if (!control) {
      return;
    }

    this.hasSearchText.set(!!control.value);
    control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.hasSearchText.set(!!value)
      });
  }

  onSearch(): void {
    const query = this.searchForm.get('search')?.value;
    this.search.emit(query ?? '');
  }

  clearSearch(): void {
    this.searchForm.patchValue({ search: '' });
    this.search.emit('');
  }
}
