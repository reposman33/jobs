import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search {
  @Output() search = new EventEmitter<string>();

  searchForm = new FormGroup({
      search: new FormControl('')
  });

  onSearch() {
    const query = this.searchForm.get('search')?.value;
    this.search.emit(query ?? '');
  }
}
