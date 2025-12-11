import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sollicitatie } from '@models';
import { SollicitatiesDataSource } from './sollicitaties-datasource';

@Component({
  selector: 'app-sollicitaties',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './sollicitaties.html',
  styleUrls: ['./sollicitaties.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Sollicitaties {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatTable) table?: MatTable<Sollicitatie>;

  protected dataSource = new SollicitatiesDataSource();
  private router = inject(Router);

  ngAfterViewInit(): void {
    // Set up the data source with paginator and sort before connecting
    // Note: MatSort should be available since matSort directive is on the table
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.table && this.paginator) {
      this.table.dataSource = this.dataSource;
    }
  }

  getLimitedSentences(text: string): string {
    if (!text) return '';
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    return sentences.slice(0, 3).join('').trim();
  }

  addNewSollicitatie(): void {
    this.router.navigate(['/add-sollicitatie']);
  }
}
